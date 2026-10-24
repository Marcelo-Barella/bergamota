<template>
  <div>
    <p class="token-opt-stats">
      Janela de contexto do modelo selecionado:
      <strong>{{ formatNumber(contextWindow) }}</strong> tokens (referência para {{ modelLabel }}).
    </p>
    <div class="token-opt-stats">
      <label for="ctx-slider">Preenchimento simulado</label>
      <input
        id="ctx-slider"
        v-model.number="fillTokens"
        type="range"
        min="0"
        :max="contextWindow"
        :step="500"
        aria-valuemin="0"
        :aria-valuemax="contextWindow"
        :aria-valuenow="fillTokens"
      />
      <span><strong>{{ formatNumber(fillTokens) }}</strong> / {{ formatNumber(contextWindow) }}</span>
    </div>
    <div class="token-opt-meter" role="progressbar" :aria-valuenow="fillPercent" aria-valuemin="0" aria-valuemax="100">
      <div
        class="token-opt-meter-fill"
        :class="{ 'token-opt-meter-fill--danger': fillPercent > 92 }"
        :style="{ width: `${fillPercent}%` }"
      />
    </div>
    <div class="token-opt-status" role="status">
      <template v-if="fillPercent < 85">
        Dentro da janela: o modelo ainda vê todo o histórico enviado.
      </template>
      <template v-else-if="fillPercent < 100">
        Perto do limite: respostas podem ficar mais curtas; priorize contexto recente e resumos.
      </template>
      <template v-else>
        Acima do limite: conteúdo antigo é truncado ou resumido (comportamento depende do produto); otimize Rules, Skills e seleção de arquivos.
      </template>
    </div>
    <div class="token-opt-card" style="margin-top: 0.75rem">
      <h3>Camadas típicas no Cursor</h3>
      <ul style="margin: 0.35rem 0 0; padding-left: 1.1rem; font-size: 0.8rem; color: var(--tok-muted); line-height: 1.45">
        <li>System + Rules (projeto e usuário)</li>
        <li>Skills carregadas na sessão</li>
        <li>MCP tool schemas expostos</li>
        <li>Histórico do chat e arquivos anexados (@)</li>
        <li>Saída do modelo (output tokens)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  contextWindow: number
  modelLabel: string
}>()

const fillTokens = ref(Math.round(props.contextWindow * 0.35))

const fillPercent = computed(() =>
  props.contextWindow ? Math.min(100, Math.round((fillTokens.value / props.contextWindow) * 100)) : 0
)

function formatNumber(n: number) {
  return new Intl.NumberFormat('pt-BR').format(n)
}
</script>
