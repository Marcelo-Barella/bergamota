<template>
  <section class="ws-lab" aria-label="Skills">
    <div class="ws-lab-head">
      <h3 class="ws-lab-title">Skills</h3>
      <nav class="ws-lab-links">
        <a :href="SKILLS_DOCS" target="_blank" rel="noopener">docs/skills</a>
        <a :href="DYNAMIC_CTX_POST" target="_blank" rel="noopener">dynamic-context</a>
        <a :href="SKILLS_SH" target="_blank" rel="noopener">skills.sh</a>
      </nav>
    </div>

    <button type="button" class="ws-btn ws-btn--sm" @click="expanded = !expanded">
      {{ expanded ? 'Recolher skill' : 'Carregar skill' }}
    </button>
    <TokenOptimizationWorkshopTokenMeter
      :value="expanded ? SKILL_FULL_TOKENS : SKILL_DESC_ONLY_TOKENS"
      :label="expanded ? 'SKILL.md completo (ilustrativo)' : 'name + description'"
    />
    <p class="ws-lab-note">
      <a :href="AGENT_BP_POST" target="_blank" rel="noopener">agent-best-practices</a>:
      Skills carregam dinamicamente; Rules ficam sempre incluídas.
    </p>

    <TokenOptimizationWorkshopClickReveal summary="Quando criar?">
      <p class="ws-reveal-line">Conclusão nossa: crie quando o carregamento progressivo compensa.</p>
      <p class="ws-reveal-line">Skill fixa em Custom Mode ≈ custo de Rule.</p>
      <p class="ws-reveal-line">`/create-skill` · `/migrate-to-skills`</p>
    </TokenOptimizationWorkshopClickReveal>

    <template v-if="showExtra">
    <p class="ws-lab-prompt">Monte `.cursor/skills/&lt;name&gt;/SKILL.md` — toque as peças:</p>
    <div class="ws-build-pieces">
      <button
        v-for="p in SKILL_BUILD_PIECES"
        :key="p.id"
        type="button"
        class="ws-chip"
        :class="{ 'ws-chip--on': buildPieces.has(p.id) }"
        @click="togglePiece(p.id)"
      >
        {{ p.label }}
      </button>
    </div>
    <pre v-if="buildPreview" class="ws-build-preview">{{ buildPreview }}</pre>

    <p class="ws-lab-prompt">{{ FRONTEND_SKILL_QUIZ.prompt }}</p>
    <div class="ws-quiz">
      <button
        v-for="o in FRONTEND_SKILL_QUIZ.options"
        :key="o.id"
        type="button"
        class="ws-chip"
        :class="{ 'ws-chip--on': skillQuiz === o.id, 'ws-chip--ok': skillQuiz === o.id && o.correct }"
        @click="skillQuiz = o.id"
      >
        {{ o.label }} · {{ o.installs }}
      </button>
    </div>
    <p class="ws-lab-note">
      Ex. docs: {{ FRONTEND_SKILL_QUIZ.docExample.name }} · paths {{ FRONTEND_SKILL_QUIZ.docExample.paths }}
    </p>

    <details class="ws-reveal">
      <summary>skills.sh · em 26 out 2026</summary>
      <ul class="ws-rank-list">
        <li v-for="s in SKILLS_SH_TOP_OCT26" :key="s.name">{{ s.name }} · {{ s.installs }}</li>
      </ul>
    </details>

    <TokenOptimizationWorkshopClickReveal summary="pstack">
      <p class="ws-reveal-line">
        <a :href="PSTACK_REPO" target="_blank" rel="noopener">cursor/plugins/pstack</a> · `/add-plugin pstack`
      </p>
      <p class="ws-reveal-line">{{ PSTACK_SKILLS.join(', ') }}</p>
      <p class="ws-reveal-line">`/poteto-mode` roteia skills sob demanda.</p>
    </TokenOptimizationWorkshopClickReveal>
    </template>

  </section>
</template>

<script setup lang="ts">
import {
  AGENT_BP_POST,
  DYNAMIC_CTX_POST,
  FRONTEND_SKILL_QUIZ,
  PSTACK_REPO,
  PSTACK_SKILLS,
  SKILL_BUILD_PIECES,
  SKILL_DESC_ONLY_TOKENS,
  SKILL_FULL_TOKENS,
  SKILLS_DOCS,
  SKILLS_SH,
  SKILLS_SH_TOP_OCT26
} from '~/data/token-optimization-skills'

withDefaults(defineProps<{ showExtra?: boolean }>(), { showExtra: false })

const expanded = defineModel<boolean>('expanded', { default: false })
const skillTokens = defineModel<number>('skillTokens', { default: SKILL_DESC_ONLY_TOKENS })

const buildPieces = ref(new Set<string>())
const skillQuiz = ref<string | null>(null)

const buildPreview = computed(() => {
  if (!buildPieces.value.size) {
    return ''
  }
  const lines = ['.cursor/skills/my-skill/SKILL.md', '---']
  for (const p of SKILL_BUILD_PIECES) {
    if (buildPieces.value.has(p.id)) {
      lines.push(p.snippet)
    }
  }
  lines.push('---', '# Instructions…')
  return lines.join('\n')
})

watch(expanded, (v) => {
  skillTokens.value = v ? SKILL_FULL_TOKENS : SKILL_DESC_ONLY_TOKENS
}, { immediate: true })

function togglePiece(id: string) {
  const next = new Set(buildPieces.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  buildPieces.value = next
}
</script>
