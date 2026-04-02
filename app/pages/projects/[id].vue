<template>
  <ShowcaseProjectsTangerina v-if="project.id === 'tangerina'" :project="project" />
  <ShowcaseProjectsAgentic v-else-if="project.id === 'agentic-browser-ai'" :project="project" />
  <ShowcaseProjectsCursorSync v-else-if="project.id === 'cursor-sync'" :project="project" />
  <ShowcaseProjectsOrchestrator v-else-if="project.id === 'cursor-ca-orchestrator'" :project="project" />
</template>

<script setup lang="ts">
import projectsData from '~/data/projects-data.json'
import type { PortfolioProject } from '~/types/portfolio-project'

definePageMeta({
  layout: 'showcase'
})

const route = useRoute()
const id = route.params.id as string
const found = projectsData.find((p) => p.id === id)

if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const project = found as PortfolioProject
</script>
