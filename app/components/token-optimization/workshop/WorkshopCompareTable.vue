<template>
  <section class="ws-compare" aria-labelledby="ws-compare-title">
    <h2 id="ws-compare-title">Antes / depois por nível</h2>
    <p class="ws-compare-note">
      Custos em USD são <strong>estimativas</strong> salvo quando o nível 3+ dispara medição SDK (badge “real”).
    </p>
    <div class="ws-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nível</th>
            <th>Antes (tokens)</th>
            <th>Depois (tokens)</th>
            <th>Custo antes</th>
            <th>Custo depois</th>
            <th>Fonte</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.level.id"
            :class="{ 'ws-row-active': row.level.id === activeLevel }"
          >
            <td>{{ row.level.id }} {{ row.level.title }}</td>
            <td>{{ fmt(row.before) }}</td>
            <td>{{ fmt(row.after) }}</td>
            <td>{{ usd(row.costBefore) }}</td>
            <td>{{ usd(row.costAfter) }}</td>
            <td><span class="ws-pill">{{ row.source }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorkshopLevelId } from '~/data/token-optimization-levels'

defineProps<{
  rows: Array<{
    level: { id: number; title: string }
    before: number
    after: number
    costBefore: number
    costAfter: number
    source: string
  }>
  activeLevel: WorkshopLevelId
}>()

function fmt(n: number) {
  return new Intl.NumberFormat('pt-BR').format(n)
}
function usd(n: number) {
  return `~US$ ${n.toFixed(4)}`
}
</script>
