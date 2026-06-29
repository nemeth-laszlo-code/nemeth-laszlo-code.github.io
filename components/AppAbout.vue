<script setup lang="ts">
import { Code2, Rocket, Users, Award } from 'lucide-vue-next'

const { t } = useI18n()
const { el, isVisible } = useScrollReveal()

const highlights = computed(() => [
  {
    icon: Code2,
    title: t('about.highlights.cleanCode.title'),
    description: t('about.highlights.cleanCode.description'),
  },
  {
    icon: Rocket,
    title: t('about.highlights.fastLearner.title'),
    description: t('about.highlights.fastLearner.description'),
  },
  {
    icon: Users,
    title: t('about.highlights.responsiveDesign.title'),
    description: t('about.highlights.responsiveDesign.description'),
  },
  {
    icon: Award,
    title: t('about.highlights.problemSolver.title'),
    description: t('about.highlights.problemSolver.description'),
  },
])

const stats = computed(() => [
  { value: t('about.stats.challenges.value'), label: t('about.stats.challenges.label') },
  { value: t('about.stats.responsive.value'), label: t('about.stats.responsive.label') },
  { value: t('about.stats.frameworks.value'), label: t('about.stats.frameworks.label') },
  { value: t('about.stats.learning.value'), label: t('about.stats.learning.label') },
])
</script>

<template>
  <section
    id="about"
    ref="el"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div
        :class="[
          'text-center mb-12',
          isVisible ? 'animate-fade-in-up' : 'opacity-0',
        ]"
      >
        <h2 class="mb-4 text-3xl sm:text-4xl">{{ t('about.title') }}</h2>
        <i18n-t
          keypath="about.description"
          tag="p"
          class="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          <template #framework>
            <strong class="text-gray-800 dark:text-gray-200">{{ t('about.descriptionFramework') }}</strong>
          </template>
        </i18n-t>
      </div>

      <!-- Highlights grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div
          v-for="(highlight, index) in highlights"
          :key="highlight.title"
          :class="[
            'text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl hover:shadow-lg transition-shadow',
            isVisible ? 'animate-fade-in-up' : 'opacity-0',
          ]"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            class="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4"
          >
            <component :is="highlight.icon" class="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 class="mb-2">{{ highlight.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">{{ highlight.description }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div
        :class="[
          'grid grid-cols-2 md:grid-cols-4 gap-6 mt-12',
          isVisible ? 'animate-fade-in-up' : 'opacity-0',
        ]"
        style="animation-delay: 400ms"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl"
        >
          <p class="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {{ stat.value }}
          </p>
          <p class="text-gray-600 dark:text-gray-400 text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
