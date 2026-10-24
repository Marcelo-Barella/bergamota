import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { promisify } from 'node:util'
import { EventEmitter } from 'node:events'
import readline from 'node:readline'
import { existsSync } from 'node:fs'
import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { getFallbackAcpEvents } from './fallbackEvents'
import { broadcastAcp } from './subscribers'

const execFileAsync = promisify(execFile)
const REQUEST_TIMEOUT_MS = 12_000

export type AcpPublicEvent = {
  type: string
  at: number
  payload: Record<string, unknown>
}

type JsonRpcMessage = {
  jsonrpc?: string
  id?: number
  method?: string
  params?: Record<string, unknown>
  result?: unknown
  error?: { message?: string; code?: number }
}

class AcpManager extends EventEmitter {
  private proc: ChildProcessWithoutNullStreams | null = null
  private nextId = 1
  private pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>()
  private sessionId: string | null = null
  private ready = false
  private starting: Promise<void> | null = null

  async resolveAgentBinary(): Promise<string | null> {
    const configured = process.env.CURSOR_AGENT_BIN
    if (configured) {
      try {
        await access(configured, constants.X_OK)
        return configured
      } catch {
        return null
      }
    }
    const candidates = ['/root/.local/bin/agent', `${process.env.HOME ?? ''}/.local/bin/agent`]
    for (const candidate of candidates) {
      if (candidate && existsSync(candidate)) {
        return candidate
      }
    }
    try {
      const { stdout } = await execFileAsync('which', ['agent'])
      const resolved = stdout.trim()
      if (resolved) {
        return resolved
      }
    } catch {
      // not on PATH
    }
    return null
  }

  isEnabled() {
    return process.env.ACP_ENABLED === 'true'
  }

  async ensureStarted(apiKey: string) {
    if (!this.isEnabled() || !apiKey) {
      return false
    }
    if (this.ready) {
      return true
    }
    if (!this.starting) {
      this.starting = this.boot(apiKey)
    }
    try {
      await this.starting
      return this.ready
    } catch {
      this.starting = null
      return false
    }
  }

  private async boot(apiKey: string) {
    const binary = await this.resolveAgentBinary()
    if (!binary) {
      throw new Error('Cursor agent CLI not found')
    }

    this.proc = spawn(binary, ['--api-key', apiKey, '--trust', 'acp'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        ...process.env,
        CURSOR_API_KEY: apiKey,
        NO_OPEN_BROWSER: '1'
      }
    })

    const rl = readline.createInterface({ input: this.proc.stdout })
    rl.on('line', (line) => this.onLine(line))

    this.proc.stderr.on('data', (chunk) => {
      this.emitPublic('acp_stderr', { line: String(chunk).trim() })
    })

    this.proc.on('exit', (code) => {
      this.ready = false
      this.emitPublic('acp_exit', { code })
      this.proc = null
      this.starting = null
    })

    await this.request('initialize', {
      protocolVersion: 1,
      clientCapabilities: { fs: { readTextFile: false, writeTextFile: false }, terminal: false },
      clientInfo: { name: 'bergamota-token-opt', version: '1.0.0' }
    })

    await this.request('authenticate', { methodId: 'cursor_login' })

    const session = (await this.request('session/new', {
      cwd: process.cwd(),
      mcpServers: []
    })) as { sessionId?: string }

    this.sessionId = session.sessionId ?? null
    if (!this.sessionId) {
      throw new Error('ACP session/new did not return sessionId')
    }

    this.ready = true
    this.emitPublic('acp_ready', { sessionId: this.sessionId })
  }

  private emitPublic(type: string, payload: Record<string, unknown>) {
    const event: AcpPublicEvent = { type, at: Date.now(), payload }
    this.emit('event', event)
    broadcastAcp(event)
  }

  private onLine(line: string) {
    let msg: JsonRpcMessage
    try {
      msg = JSON.parse(line) as JsonRpcMessage
    } catch {
      return
    }

    if (msg.id && (msg.result !== undefined || msg.error)) {
      const waiter = this.pending.get(msg.id)
      if (!waiter) {
        return
      }
      this.pending.delete(msg.id)
      if (msg.error) {
        waiter.reject(new Error(msg.error.message ?? 'ACP error'))
      } else {
        waiter.resolve(msg.result)
      }
      return
    }

    if (msg.method === 'session/update') {
      const params = msg.params ?? {}
      this.emitPublic('session_update', params as Record<string, unknown>)
      const usage = this.extractUsage(params)
      if (usage) {
        this.emitPublic('token_usage', usage)
      }
      return
    }

    if (msg.method === 'session/request_permission') {
      this.respond(msg.id!, {
        outcome: { outcome: 'selected', optionId: 'allow-once' }
      })
      this.emitPublic('permission_auto', { method: msg.method })
      return
    }

    if (msg.method?.startsWith('cursor/')) {
      this.emitPublic('cursor_extension', { method: msg.method, params: msg.params ?? {} })
      if (msg.id) {
        this.respond(msg.id, { outcome: { outcome: 'accepted' } })
      }
    }
  }

  private extractUsage(params: Record<string, unknown>) {
    const update = params.update as Record<string, unknown> | undefined
    if (!update) {
      return null
    }
    const raw =
      update.usage ??
      update.tokenUsage ??
      (update.sessionUpdate === 'usage' ? update : null)
    if (!raw || typeof raw !== 'object') {
      return null
    }
    const u = raw as Record<string, number>
    if (typeof u.inputTokens !== 'number' && typeof u.totalTokens !== 'number') {
      return null
    }
    return {
      inputTokens: u.inputTokens ?? 0,
      outputTokens: u.outputTokens ?? 0,
      totalTokens: u.totalTokens ?? (u.inputTokens ?? 0) + (u.outputTokens ?? 0),
      source: 'acp' as const,
      unconfirmed: true
    }
  }

  private respond(id: number, result: unknown) {
    if (!this.proc?.stdin.writable) {
      return
    }
    this.proc.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, result })}\n`)
  }

  private request(method: string, params: Record<string, unknown>) {
    if (!this.proc?.stdin.writable) {
      return Promise.reject(new Error('ACP process not running'))
    }
    const id = this.nextId++
    const payload = { jsonrpc: '2.0', id, method, params }
    this.proc.stdin.write(`${JSON.stringify(payload)}\n`)
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id)
        reject(new Error(`ACP request timed out: ${method}`))
      }, REQUEST_TIMEOUT_MS)
      this.pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer)
          resolve(value)
        },
        reject: (error) => {
          clearTimeout(timer)
          reject(error)
        }
      })
    })
  }

  async prompt(apiKey: string, text: string, model?: string) {
    let live = false
    try {
      live = await this.ensureStarted(apiKey)
    } catch {
      live = false
    }
    if (!live || !this.sessionId) {
      return { mode: 'fallback' as const, events: getFallbackAcpEvents(text) }
    }

    if (model) {
      try {
        await this.request('session/set_config_option', {
          sessionId: this.sessionId,
          configId: 'model',
          value: model
        })
      } catch {
        // Model override may be unavailable on some builds — continue with default.
      }
    }

    try {
      await this.request('session/set_mode', { sessionId: this.sessionId, mode: 'ask' })
    } catch {
      // ask mode keeps tools read-only; ignore if unsupported.
    }

    const result = await this.request('session/prompt', {
      sessionId: this.sessionId,
      prompt: [{ type: 'text', text }]
    })

    return { mode: 'live' as const, result }
  }
}

const globalKey = '__bergamota_acp_manager__'
type GlobalWithAcp = typeof globalThis & { [globalKey]?: AcpManager }

export function getAcpManager() {
  const g = globalThis as GlobalWithAcp
  if (!g[globalKey]) {
    g[globalKey] = new AcpManager()
  }
  return g[globalKey]
}
