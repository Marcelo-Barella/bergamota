<template>
  <section id="meetup-photos" class="relative bg-white px-4 py-24 sm:px-6 md:px-10 md:py-32">
    <div class="mx-auto min-w-0 max-w-7xl">
      <div
        data-gsap-section-head
        class="mb-16 border-l-8 border-[#d97706] pl-6 md:pl-8"
      >
        <h2
          class="font-headline min-w-0 max-w-full break-words text-[clamp(2.25rem,7vw+0.75rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
        >
          {{ t('home.events.sectionLabel') }}
        </h2>
      </div>
      <ol class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <li
          v-for="(event, index) in featuredHomeEvents"
          :key="event.id"
          class="min-w-0 border-2 border-[#1b1c1a] bg-[#f8f6f3] px-5 py-6"
        >
          <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d97706]">
            {{ indexLabel(index) }}
          </p>
          <h3 class="font-headline mt-3 min-w-0 break-words text-[clamp(1.5rem,4vw,2.35rem)] font-black uppercase leading-[0.95] tracking-tighter">
            {{ eventTitle(event) }}
          </h3>
          <p
            v-if="event.detailKey"
            class="font-editorial mt-4 text-lg italic leading-snug"
          >
            {{ t(event.detailKey) }}
          </p>
        </li>
      </ol>
      <div ref="moreRoot" class="relative mt-10" @keyup.esc.stop="closeMore">
        <button
          type="button"
          class="inline-flex items-center border-2 border-[#1b1c1a] bg-[#f8f6f3] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a] transition-colors hover:bg-[#d97706] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97706]"
          :aria-expanded="moreOpen"
          :aria-controls="moreId"
          @click="toggleMore"
        >
          {{ t('home.events.moreLabel') }}
          <span
            aria-hidden="true"
            class="ml-3 inline-block h-1.5 w-1.5 border-b-2 border-r-2 border-current transition-transform"
            :class="moreOpen ? '-translate-y-px rotate-[-135deg]' : 'translate-y-0.5 rotate-45'"
          />
        </button>
        <ul
          v-if="moreOpen"
          :id="moreId"
          class="mt-3 w-full max-w-xl border-2 border-[#1b1c1a] bg-[#f8f6f3] shadow-[5px_8px_0_0_rgba(27,28,26,0.07)]"
          :aria-label="t('home.events.moreLabel')"
        >
          <li
            v-for="event in moreHomeEvents"
            :key="event.id"
            class="border-b border-[#1b1c1a]/10 px-5 py-5 last:border-b-0"
          >
            <p class="font-headline text-2xl font-black uppercase leading-none tracking-tighter">
              {{ eventTitle(event) }}
            </p>
            <p v-if="event.detailKey" class="mt-3 text-base leading-relaxed">
              {{ t(event.detailKey) }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  featuredHomeEvents,
  homeEventTitle,
  moreHomeEvents,
  type HomeEvent,
} from '~/data/home-events'

const { t } = useI18n()
const moreOpen = ref(false)
const moreRoot = ref<HTMLElement | null>(null)
const moreId = useId()

function eventTitle(event: HomeEvent) {
  return homeEventTitle(event, (key) => String(t(key)))
}

function indexLabel(index: number) {
  return String(index + 1).padStart(2, '0')
}

function toggleMore() {
  moreOpen.value = !moreOpen.value
}

function closeMore() {
  moreOpen.value = false
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!moreOpen.value || !moreRoot.value) return
  if (event.target instanceof Node && moreRoot.value.contains(event.target)) return
  moreOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
})
</script>
