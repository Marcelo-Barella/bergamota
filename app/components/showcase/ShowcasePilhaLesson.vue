<template>
  <article ref="rootEl" class="pilha">
    <section
      v-for="(band, index) in bands"
      :id="band.id"
      :key="band.id"
      class="band"
      :class="index % 2 === 0 ? 'band-white' : 'band-paper'"
    >
      <button type="button" class="agent-pull" :aria-label="band.eyebrow" @click="emit('openSection', band.emitId ?? band.id)">
        <span class="agent-pull-chevron" aria-hidden="true">‹</span>
        <span class="agent-pull-label">Agent</span>
      </button>
      <div class="inner">
        <div class="visual">
          <div class="stack" data-stack :data-kind="band.kind">
            <div
              v-for="(plate, plateIndex) in band.plates"
              :key="`${band.id}-${plateIndex}`"
              class="plate"
              :data-role="plate.role"
              :style="{ '--i': String(plateIndex) }"
            >
              <span v-if="plate.kicker" class="kicker">{{ plate.kicker }}</span>
              <strong>{{ plate.label }}</strong>
              <span v-if="plate.meta" class="meta">{{ plate.meta }}</span>
            </div>
          </div>
          <p v-if="band.caption" class="caption">{{ band.caption }}</p>
        </div>
        <div class="copy">
          <p class="eyebrow">{{ band.eyebrow }}</p>
          <component :is="index === 0 ? 'h1' : 'h2'" class="title">
            <span>{{ band.title }}</span>
            <span v-if="band.stroke" class="stroke">{{ band.stroke }}</span>
          </component>
          <p class="lead">{{ band.lead }}</p>
          <p v-if="band.aside" class="aside">{{ band.aside }}</p>
          <ul v-if="band.chips" class="chips">
            <li v-for="chip in band.chips" :key="chip">{{ chip }}</li>
          </ul>
          <table v-if="band.bill" class="bill">
            <caption>{{ band.billLabel }}</caption>
            <thead>
              <tr>
                <th>{{ t('lessons.pilha.preco.kind') }}</th>
                <th>{{ t('lessons.pilha.preco.tokens') }}</th>
                <th>{{ t('lessons.pilha.preco.rate') }}</th>
                <th>{{ t('lessons.pilha.preco.cost') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in band.bill" :key="row.kind">
                <td>{{ row.kind }}</td>
                <td>{{ row.tokens }}</td>
                <td>{{ row.rate }}</td>
                <td>{{ row.cost }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="band.total" class="aside">{{ band.total }}</p>
          <p v-if="band.note" class="aside">{{ band.note }}</p>
          <p v-if="band.recap" class="lead">{{ band.recap }}</p>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
type Plate = { label: string; meta?: string; kicker?: string; role?: string }
type BillRow = { kind: string; tokens: string; rate: string; cost: string }
type Band = {
  id: string
  emitId?: string
  kind: string
  eyebrow: string
  title: string
  stroke?: string
  lead: string
  aside?: string
  caption?: string
  chips?: string[]
  plates: Plate[]
  bill?: BillRow[]
  billLabel?: string
  total?: string
  note?: string
  recap?: string
}

const emit = defineEmits<{ openSection: [id: string] }>()
const { t } = useI18n()
const rootEl = ref<HTMLElement | null>(null)
let stackObserver: IntersectionObserver | null = null

function plate(label: string, meta?: string, role?: string, kicker?: string): Plate {
  return { label, meta, role, kicker }
}

const bands = computed((): Band[] => {
  const p = (key: string) => t(`lessons.pilha.${key}`)
  const history = [1, 2, 3, 4, 5, 6].map((n) => plate(p('conversa.tall'), String(n), 'extra'))
  return [
    {
      id: 'token',
      kind: 'split',
      eyebrow: p('token.eyebrow'),
      title: p('token.title'),
      stroke: p('token.stroke'),
      lead: p('token.lead'),
      aside: p('token.aside'),
      caption: p('token.caption'),
      plates: [plate('con', '', 'word'), plate('texto', '', 'word')]
    },
    {
      id: 'tipos',
      kind: 'kinds',
      eyebrow: p('tipos.eyebrow'),
      title: p('tipos.title'),
      lead: p('tipos.lead'),
      aside: p('tipos.aside'),
      plates: [
        plate(p('tipos.p1'), p('tipos.p1m'), 'input'),
        plate(p('tipos.p2'), p('tipos.p2m'), 'output'),
        plate(p('tipos.p3'), p('tipos.p3m'), 'write'),
        plate(p('tipos.p4'), p('tipos.p4m'), 'read')
      ]
    },
    {
      id: 'cache',
      emitId: 'tipos',
      kind: 'cache',
      eyebrow: p('cache.eyebrow'),
      title: p('cache.title'),
      lead: p('cache.lead'),
      aside: p('cache.aside'),
      plates: [
        plate(p('tipos.p1'), p('tipos.p1m'), 'stable'),
        plate(p('rules.plate'), '', 'stable'),
        plate(p('tipos.p4'), p('tipos.p4m'), 'read')
      ]
    },
    {
      id: 'preco',
      kind: 'models',
      eyebrow: p('preco.eyebrow'),
      title: p('preco.title'),
      lead: p('preco.lead'),
      aside: p('preco.aside'),
      plates: [
        plate(p('preco.opus'), p('preco.opusm'), 'heavy'),
        plate(p('preco.composer'), p('preco.composerm'), 'light'),
        plate(p('preco.fast'), p('preco.fastm'))
      ],
      billLabel: p('preco.bill'),
      total: p('preco.total'),
      note: p('preco.usage'),
      bill: [
        { kind: p('preco.input'), tokens: p('preco.r1t'), rate: p('preco.r1r'), cost: p('preco.r1c') },
        { kind: p('preco.output'), tokens: p('preco.r2t'), rate: p('preco.r2r'), cost: p('preco.r2c') },
        { kind: p('preco.read'), tokens: p('preco.r3t'), rate: p('preco.r3r'), cost: p('preco.r3c') },
        { kind: p('preco.write'), tokens: p('preco.r4t'), rate: p('preco.r4r'), cost: p('preco.r4c') }
      ]
    },
    {
      id: 'conversa',
      kind: 'chat',
      eyebrow: p('conversa.eyebrow'),
      title: p('conversa.title'),
      lead: p('conversa.lead'),
      aside: p('conversa.aside'),
      note: p('conversa.nolima'),
      plates: [...history, plate(p('conversa.short'), '', 'fresh')]
    },
    {
      id: 'contexto',
      kind: 'chips',
      eyebrow: p('contexto.eyebrow'),
      title: p('contexto.title'),
      lead: p('contexto.lead'),
      chips: p('contexto.chips').split(', '),
      plates: [plate('RAM', '', 'front')]
    },
    {
      id: 'anel',
      kind: 'meter',
      eyebrow: p('anel.eyebrow'),
      title: p('anel.title'),
      lead: p('anel.lead'),
      aside: p('anel.aside'),
      plates: [plate(''), plate(''), plate(''), plate(p('batedor.slip'), '', 'slip')]
    },
    {
      id: 'arroba',
      kind: 'mention',
      eyebrow: p('arroba.eyebrow'),
      title: p('arroba.title'),
      lead: p('arroba.lead'),
      aside: p('arroba.aside'),
      plates: [plate(p('arroba.paste'), '', 'fat'), plate(p('arroba.ref'), '', 'thin')]
    },
    {
      id: 'rules',
      kind: 'front',
      eyebrow: p('rules.eyebrow'),
      title: p('rules.title'),
      lead: p('rules.lead'),
      aside: p('rules.aside'),
      plates: [plate(p('rules.plate'), '', 'front'), plate(p('contexto.title'), '', 'body')]
    },
    {
      id: 'ignore',
      kind: 'outside',
      eyebrow: p('ignore.eyebrow'),
      title: p('ignore.title'),
      lead: p('ignore.lead'),
      aside: p('ignore.aside'),
      plates: [plate(p('ignore.git'), '', 'out'), plate(p('ignore.cursor'), '', 'blocked')]
    },
    {
      id: 'skills',
      kind: 'spine',
      eyebrow: p('skills.eyebrow'),
      title: p('skills.title'),
      lead: p('skills.lead'),
      aside: p('skills.aside'),
      plates: [plate(p('skills.spine'), '', 'spine'), plate(p('skills.body'), '', 'open')]
    },
    {
      id: 'mcp',
      kind: 'tools',
      eyebrow: p('mcp.eyebrow'),
      title: p('mcp.title'),
      lead: p('mcp.lead'),
      aside: p('mcp.aside'),
      plates: [plate('MCP', '', 'on'), plate('MCP', '', 'off'), plate('MCP', '', 'off'), plate('MCP', '', 'on')]
    },
    {
      id: 'batedor',
      kind: 'scout',
      eyebrow: p('batedor.eyebrow'),
      title: p('batedor.title'),
      lead: p('batedor.lead'),
      aside: p('batedor.aside'),
      plates: [plate(''), plate(''), plate(p('batedor.slip'), '', 'slip')]
    },
    {
      id: 'epilogo',
      kind: 'recap',
      eyebrow: p('epilogo.eyebrow'),
      title: p('epilogo.title'),
      lead: p('epilogo.lead'),
      aside: p('epilogo.aside'),
      recap: p('epilogo.recap'),
      plates: [plate('@'), plate('Rules'), plate('Skills'), plate('MCP'), plate('Docs')]
    }
  ]
})

function settleStacks(reduce: boolean) {
  const nodes = rootEl.value?.querySelectorAll<HTMLElement>('[data-stack]') ?? []
  if (reduce) {
    nodes.forEach((node) => node.classList.add('is-settled'))
    return
  }
  stackObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-settled')
      }
    }
  }, { threshold: 0.4 })
  nodes.forEach((node) => stackObserver?.observe(node))
}

onMounted(() => {
  settleStacks(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
})

onBeforeUnmount(() => {
  stackObserver?.disconnect()
})
</script>
