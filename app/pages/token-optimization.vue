<template>
  <div class="token-opt-page">
    <header class="token-opt-nav">
      <div class="token-opt-nav-inner">
        <NuxtLink to="/" style="color: var(--tok-text); text-decoration: none; font-weight: 600">Bergamota</NuxtLink>
        <nav class="token-opt-steps" aria-label="Níveis do workshop">
          <button
            v-for="step in steps"
            :key="step.id"
            type="button"
            class="token-opt-step"
            :aria-current="activeStep === step.id ? 'step' : undefined"
            @click="activeStep = step.id"
          >
            {{ step.label }}
          </button>
        </nav>
      </div>
    </header>

    <header class="token-opt-hero">
      <h1>Otimização de tokens no Cursor</h1>
      <p>
        Playground interativo — workshop UPF, 29 out 2026. Texto em português; nomes de produto em English (Cursor,
        Composer, Rules, Skills, MCP, Subagents).
      </p>
    </header>

    <main class="token-opt-main">
      <section v-show="activeStep === 'tokens'" class="token-opt-section" aria-labelledby="sec-tokens">
        <div class="token-opt-section-header">
          <h2 id="sec-tokens">1. O que é um token?</h2>
          <span class="token-opt-badge">Básico</span>
        </div>
        <div class="token-opt-body">
          <TokenOptimizationTokenVisualizer />
        </div>
      </section>

      <section v-show="activeStep === 'context'" class="token-opt-section" aria-labelledby="sec-context">
        <div class="token-opt-section-header">
          <h2 id="sec-context">2. Modelo e janela de contexto</h2>
          <span class="token-opt-badge">Intermediário</span>
        </div>
        <div class="token-opt-body">
          <TokenOptimizationContextWindow
            :context-window="contextWindow"
            :model-label="defaultModel"
          />
        </div>
      </section>

      <section v-show="activeStep === 'acp'" class="token-opt-section" aria-labelledby="sec-acp">
        <div class="token-opt-section-header">
          <h2 id="sec-acp">4. Ao vivo com ACP + Cloud Agents</h2>
          <span class="token-opt-badge" :class="{ 'token-opt-badge--live': config?.acp?.enabled }">
            {{ config?.acp?.enabled ? 'ACP VPS' : 'ACP off' }}
          </span>
        </div>
        <div class="token-opt-body">
          <TokenOptimizationAcpLiveFeed />
        </div>
      </section>

      <section v-show="activeStep === 'optimize'" class="token-opt-section" aria-labelledby="sec-opt">
        <div class="token-opt-section-header">
          <h2 id="sec-opt">3+. Estratégias de otimização</h2>
          <span class="token-opt-badge" :class="{ 'token-opt-badge--live': config?.hasApiKey }">
            {{ config?.hasApiKey ? 'SDK live' : 'Fallback' }}
          </span>
        </div>
        <div class="token-opt-body">
          <TokenOptimizationOptimizationLab :config="config" />
        </div>
      </section>

      <section class="token-opt-section" aria-labelledby="sec-sdk">
        <div class="token-opt-section-header">
          <h2 id="sec-sdk">Cursor SDK (servidor)</h2>
        </div>
        <div class="token-opt-body token-opt-stats" style="flex-direction: column; align-items: flex-start">
          <p style="margin: 0; line-height: 1.5; color: var(--tok-muted)">
            Pacote <strong>@cursor/sdk</strong> (TypeScript). Autenticação via variável de ambiente
            <code>CURSOR_API_KEY</code> apenas no servidor (VPS Docker / Nitro) — nunca no bundle do cliente.
          </p>
          <p v-if="sdkNote" style="margin: 0.5rem 0 0; line-height: 1.5; color: var(--tok-muted)">{{ sdkNote }}</p>
          <p style="margin: 0.5rem 0 0">
            Modelo padrão das execuções: <strong>{{ defaultModel }}</strong>. Limites:
            {{ config?.rateLimits.perIpPerMinute }} req/IP/min, {{ config?.rateLimits.globalPerMinute }} global/min.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/token-optimization.css'

definePageMeta({
  layout: false
})

useHead({
  title: 'Otimização de tokens — Bergamota',
  meta: [
    {
      name: 'description',
      content: 'Playground interativo sobre tokens, contexto e otimização no Cursor (workshop UPF).'
    }
  ],
  htmlAttrs: { class: 'dark' }
})

const { config, loadConfig } = useTokenOptimization()

await loadConfig()

const defaultModel = computed(() => config.value?.defaultModel ?? 'composer-2.5')
const contextWindow = computed(() => config.value?.contextWindowTokens ?? 200000)
const sdkNote = computed(() => config.value?.sdk.usageNote ?? '')

const steps = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'context', label: 'Contexto' },
  { id: 'optimize', label: 'Otimizar' },
  { id: 'acp', label: 'ACP ao vivo' }
] as const

const activeStep = ref<(typeof steps)[number]['id']>('tokens')
</script>
