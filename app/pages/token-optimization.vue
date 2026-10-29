<template>
  <div class="token-workshop token-workshop--blog">
    <TokenOptimizationWorkshopStaircase
      :levels="WORKSHOP_LEVELS"
      :active="activeLevel"
      :visited="visited"
      :progress="progressPercent()"
      @select="openLevel"
    />

    <TokenOptimizationWorkshopContextBar
      :fill-percent="displayFillPercent"
      :tokens="displayTokens"
      :context-window="contextWindow"
      :thresholds="thresholds"
      :overflow="displayOverflow"
    />

    <div class="ws-center ws-blog">
      <header class="ws-hero-mini">
        <h1>Otimização de tokens</h1>
        <p class="ws-hero-deck">
          Contexto, custo e prática no <strong>Composer-2.5</strong> ·
          <a :href="CURSOR_TOKEN_EFFICIENCY_POST" target="_blank" rel="noopener noreferrer">Cursor set/2026</a>
        </p>
      </header>

      <TokenOptimizationWorkshopArticle
        anchor="contexto"
        title="Contexto"
        :paragraphs="INTRO_CONTEXT_PROSE.paragraphs"
        interact
        @interact="openPanel('contexto', 'Contexto')"
      />

      <TokenOptimizationWorkshopArticle
        anchor="tokenizer"
        title="Tokens na prática"
        :paragraphs="TOKEN_SPLITTER_PROSE.paragraphs"
        interact
        @interact="openPanel('tokenizer', 'Tokenizer')"
      />

      <TokenOptimizationWorkshopArticle
        v-for="lv in WORKSHOP_LEVELS"
        :key="lv.id"
        :anchor="`nivel-${lv.id}`"
        :title="`${lv.id} · ${lv.title}`"
        :paragraphs="LEVEL_PROSE[lv.id].paragraphs"
        interact
        @interact="openLevel(lv.id)"
      />

      <TokenOptimizationWorkshopArticle
        anchor="precos"
        title="Preços e cache"
        :paragraphs="PRICING_PROSE.paragraphs"
        interact
        @interact="openPanel('precos', 'Preços e cache')"
      />

      <TokenOptimizationWorkshopArticle
        anchor="learn"
        title="Tool calling, Agents e Customizing"
        :paragraphs="LEARN_CUSTOM_PROSE.paragraphs"
        interact
        @interact="openPanel('learn', 'Regra ou Skill?')"
      />

      <TokenOptimizationWorkshopArticle
        anchor="rules"
        title="Rules"
        :paragraphs="RULES_PROSE.paragraphs"
        interact
        @interact="openPanel('rules', 'Rules')"
      />

      <TokenOptimizationWorkshopArticle
        anchor="skills"
        title="Skills"
        :paragraphs="SKILLS_PROSE.paragraphs"
        interact
        @interact="openPanel('skills', 'Skills')"
      >
        <template #prose>
          <details class="ws-extra-fold">
            <summary><span class="ws-tier-tag ws-tier-tag--extra">extra</span> skills.sh · 26 out 2026</summary>
            <ul class="ws-rank-list">
              <li v-for="s in SKILLS_SH_TOP_OCT26" :key="s.name">{{ s.name }} · {{ s.installs }}</li>
            </ul>
          </details>
          <details class="ws-extra-fold">
            <summary><span class="ws-tier-tag ws-tier-tag--extra">extra</span> pstack</summary>
            <p class="ws-reveal-line">
              <a :href="PSTACK_REPO" target="_blank" rel="noopener">cursor/plugins/pstack</a> ·
              <code>/add-plugin pstack</code> · {{ PSTACK_SKILLS.join(', ') }}
            </p>
          </details>
        </template>
      </TokenOptimizationWorkshopArticle>

      <TokenOptimizationWorkshopArticle
        anchor="mcp"
        title="MCP"
        :paragraphs="MCP_PROSE.paragraphs"
        interact
        @interact="openPanel('mcp', 'MCP')"
      >
        <template #prose>
          <details class="ws-extra-fold">
            <summary><span class="ws-tier-tag ws-tier-tag--extra">extra</span> Casos e marketplace</summary>
            <div class="ws-chips-row">
              <a
                v-for="c in MCP_USE_CHIPS"
                :key="c"
                class="ws-chip ws-chip--link"
                :href="CURSOR_MARKETPLACE"
                target="_blank"
                rel="noopener"
                >{{ c }}</a
              >
            </div>
          </details>
          <details class="ws-extra-fold">
            <summary><span class="ws-tier-tag ws-tier-tag--extra">extra</span> Medições Anthropic + estimativas 10 vs 50 servidores</summary>
            <ul class="ws-sourced-list">
              <li v-for="fig in MCP_SOURCED_FIGURES" :key="fig.label">
                <span class="ws-badge" :class="`ws-badge--${fig.badge.replace(/\s/g, '-')}`">{{ fig.badge }}</span>
                <a :href="fig.href" target="_blank" rel="noopener">{{ fig.label }}</a>
              </li>
            </ul>
            <p class="ws-lab-note">{{ MCP_ESTIMATE_ASSUMPTIONS }}</p>
          </details>
        </template>
      </TokenOptimizationWorkshopArticle>

      <TokenOptimizationWorkshopArticle
        anchor="subagents"
        title="Subagents"
        :paragraphs="SUBAGENTS_PROSE.paragraphs"
        interact
        @interact="openPanel('subagents', 'Subagents')"
      />
    </div>

    <TokenOptimizationWorkshopInteractPanel :open="panelOpen" :title="panelTitle" @close="closePanel">
      <TokenOptimizationWorkshopContextIntro v-if="panelId === 'contexto'" />
      <TokenOptimizationWorkshopTokenSplitter v-else-if="panelId === 'tokenizer'" />
      <TokenOptimizationWorkshopPricingLab v-else-if="panelId === 'precos'" />
      <TokenOptimizationWorkshopRuleSkillQuiz v-else-if="panelId === 'learn'" />
      <TokenOptimizationWorkshopRulesLab
        v-else-if="panelId === 'rules'"
        v-model:rule-type="ruleType"
        v-model:tokens-per-message="rulesTokensPerMessage"
      />
      <TokenOptimizationWorkshopSkillsLab
        v-else-if="panelId === 'skills'"
        v-model:expanded="skillExpanded"
        v-model:skill-tokens="skillContextTokens"
        :show-extra="true"
      />
      <TokenOptimizationWorkshopMcpLab
        v-else-if="panelId === 'mcp'"
        v-model:server-count="mcpServerCount"
        v-model:names-only="mcpNamesOnly"
        v-model:turn-tokens="mcpTurnTokens"
        :show-extra="true"
      />
      <TokenOptimizationWorkshopSubagentsLab
        v-else-if="panelId === 'subagents'"
        v-model:use-subagent="subagentIsolated"
        v-model:parallel-count="subagentParallel"
        v-model:parent-context-tokens="subagentParentTokens"
        v-model:total-spend-tokens="subagentTotalTokens"
      />
      <TokenOptimizationWorkshopControls
        v-else-if="panelId === 'level'"
        v-model:prompt-text="promptText"
        v-model:concise-prompt="concisePrompt"
        v-model:multiple-choice="multipleChoice"
        v-model:use-rules="useRules"
        v-model:use-at-mention="useAtMention"
        v-model:confirm-before-tools="confirmBeforeTools"
        v-model:route-cheap-first="routeCheapFirst"
        v-model:block-risky-tools="blockRiskyTools"
        v-model:return-summary-not-file="returnSummaryNotFile"
        v-model:parallel-filter="parallelFilter"
        v-model:thresholds="thresholds"
        v-model:rule-type="ruleType"
        v-model:rules-tokens-per-message="rulesTokensPerMessage"
        v-model:mcp-server-count="mcpServerCount"
        v-model:mcp-names-only="mcpNamesOnly"
        v-model:mcp-turn-tokens="mcpTurnTokens"
        v-model:skill-expanded="skillExpanded"
        v-model:skill-context-tokens="skillContextTokens"
        v-model:subagent-isolated="subagentIsolated"
        v-model:parallel-count="subagentParallel"
        v-model:subagent-parent-tokens="subagentParentTokens"
        v-model:subagent-total-tokens="subagentTotalTokens"
        :level="level"
        :tokenizer-count="tokenizerCount"
        :fill-percent="fillPercent"
        :measuring="measuring"
        :live-run="liveRun"
        in-panel
        @measure="onMeasure"
      />
    </TokenOptimizationWorkshopInteractPanel>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/token-optimization.css'
import { CURSOR_TOKEN_EFFICIENCY_POST } from '~/data/token-optimization-blog'
import {
  INTRO_CONTEXT_PROSE,
  LEARN_CUSTOM_PROSE,
  LEVEL_PROSE,
  MCP_PROSE,
  PRICING_PROSE,
  RULES_PROSE,
  SKILLS_PROSE,
  SUBAGENTS_PROSE,
  TOKEN_SPLITTER_PROSE
} from '~/data/token-optimization-prose'
import {
  MCP_ESTIMATE_ASSUMPTIONS,
  MCP_SOURCED_FIGURES,
  MCP_USE_CHIPS,
  CURSOR_MARKETPLACE
} from '~/data/token-optimization-mcp'
import { PSTACK_REPO, PSTACK_SKILLS, SKILLS_SH_TOP_OCT26 } from '~/data/token-optimization-skills'
import type { WorkshopLevelId } from '~/data/token-optimization-levels'
import { useTokenWorkshop } from '~/composables/useTokenWorkshop'
import { useTokenOptimization } from '~/composables/useTokenOptimization'

definePageMeta({ layout: false })

useHead({
  title: 'Otimização de tokens — Bergamota',
  meta: [
    {
      name: 'description',
      content: 'Lab interativo: contexto, tokens e eficiência no Cursor (Composer-2.5).'
    }
  ],
  htmlAttrs: { class: 'dark' }
})

const { config, loadConfig, runDemo } = useTokenOptimization()
await loadConfig()

const workshop = useTokenWorkshop()
const {
  WORKSHOP_LEVELS,
  contextWindow,
  activeLevel,
  visited,
  thresholds,
  promptText,
  concisePrompt,
  multipleChoice,
  useRules,
  useAtMention,
  confirmBeforeTools,
  routeCheapFirst,
  blockRiskyTools,
  returnSummaryNotFile,
  parallelFilter,
  modelId,
  ruleType,
  rulesTokensPerMessage,
  mcpServerCount,
  mcpNamesOnly,
  mcpTurnTokens,
  skillExpanded,
  skillContextTokens,
  subagentIsolated,
  subagentParallel,
  subagentParentTokens,
  subagentTotalTokens,
  level,
  liveRun,
  measuring,
  tokenizerCount,
  simulatedFillTokens,
  fillPercent,
  setLevel,
  progressPercent,
  measureWithSdk
} = workshop

if (config.value?.contextWindowTokens) {
  contextWindow.value = config.value.contextWindowTokens
}
if (config.value?.defaultModel) {
  modelId.value = config.value.defaultModel
}

const panelId = ref<string | null>(null)
const panelTitle = ref('')
const panelOpen = computed(() => panelId.value != null)

function openPanel(id: string, title: string) {
  panelId.value = id
  panelTitle.value = title
}

function openLevel(id: WorkshopLevelId) {
  setLevel(id)
  panelId.value = 'level'
  panelTitle.value = `Nível ${id} · ${level.value.title}`
  if (import.meta.client) {
    document.getElementById(`nivel-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function closePanel() {
  panelId.value = null
}

const displayTokens = computed(() => {
  if (activeLevel.value === 5 && mcpTurnTokens.value > contextWindow.value) {
    return mcpTurnTokens.value
  }
  return simulatedFillTokens.value
})

const displayFillPercent = computed(() =>
  contextWindow.value ? Math.min(100, Math.round((displayTokens.value / contextWindow.value) * 100)) : 0
)

const displayOverflow = computed(
  () => displayTokens.value > contextWindow.value || (activeLevel.value === 5 && mcpTurnTokens.value > contextWindow.value)
)

async function onMeasure() {
  await measureWithSdk(runDemo)
}
</script>
