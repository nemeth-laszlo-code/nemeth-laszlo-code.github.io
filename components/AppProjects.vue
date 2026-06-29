<script setup lang="ts">
import { ExternalLink, Github, Star, TrendingUp, Users } from 'lucide-vue-next'
import type { Component } from 'vue'
import projectsData from '~/data/projects.json'

const { t, locale } = useI18n()
const { el, isVisible } = useScrollReveal()

type Locale = 'en' | 'hu'

const iconMap: Record<string, Component> = {
  Star,
  TrendingUp,
  Users,
}

const featuredProject = computed(() =>
  projectsData.find((p) => p.featured)
)

const otherProjects = computed(() =>
  projectsData.filter((p) => !p.featured)
)

function getLocalizedText(field: Record<string, string> | string): string {
  if (typeof field === 'string') return field
  return field[locale.value as Locale] ?? field['en'] ?? ''
}
</script>

<template>
  <section
    id="projects"
    ref="el"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        :class="[
          'text-center mb-12',
          isVisible ? 'animate-fade-in-up' : 'opacity-0',
        ]"
      >
        <h2 class="mb-4 text-3xl sm:text-4xl">{{ t('projects.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          {{ t('projects.subtitle') }}
        </p>
      </div>

      <!-- Featured project -->
      <div
        v-if="featuredProject"
        :class="[
          'mb-12 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden',
          isVisible ? 'animate-fade-in-up' : 'opacity-0',
        ]"
        style="animation-delay: 100ms"
      >
        <div class="relative">
          <div class="absolute top-4 left-4 z-10">
            <span
              class="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold flex items-center gap-2"
            >
              <Star class="w-4 h-4" />
              {{ t('projects.featuredBadge') }}
            </span>
          </div>
          <div :class="`bg-gradient-to-br ${featuredProject.image} h-64 sm:h-80 relative`">
            <div class="absolute inset-0 bg-black/10" />
          </div>
        </div>
        <div class="p-6 sm:p-8">
          <h3 class="text-2xl sm:text-3xl mb-3">
            {{ getLocalizedText(featuredProject.title) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4 text-lg">
            {{ getLocalizedText(featuredProject.fullDescription ?? featuredProject.description) }}
          </p>

          <!-- Metrics -->
          <div
            v-if="Array.isArray(featuredProject.metrics)"
            class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
          >
            <div
              v-for="metric in featuredProject.metrics"
              :key="metric.value"
              class="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
            >
              <component
                :is="iconMap[metric.icon]"
                class="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0"
              />
              <div>
                <p class="font-bold text-lg text-emerald-700 dark:text-emerald-300">
                  {{ metric.value }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ getLocalizedText(metric.label) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in featuredProject.tags"
              :key="tag"
              class="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              :href="featuredProject.liveUrl"
              class="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <ExternalLink class="w-5 h-5" />
              {{ t('projects.viewDemo') }}
            </a>
            <a
              :href="featuredProject.githubUrl"
              class="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Github class="w-5 h-5" />
              {{ t('projects.viewCode') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Other projects grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, index) in otherProjects"
          :key="project.id"
          :class="[
            'bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group',
            isVisible ? 'animate-fade-in-up' : 'opacity-0',
          ]"
          :style="{ animationDelay: `${(index + 2) * 100}ms` }"
        >
          <div :class="`bg-gradient-to-br ${project.image} h-48 relative`">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          <div class="p-6">
            <h3 class="mb-2 text-xl">{{ getLocalizedText(project.title) }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              {{ getLocalizedText(project.description) }}
            </p>
            <p
              v-if="project.metrics && !Array.isArray(project.metrics)"
              class="text-emerald-600 dark:text-emerald-400 font-semibold mb-4 text-sm"
            >
              📊 {{ getLocalizedText(project.metrics) }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-3">
              <a
                :href="project.liveUrl"
                class="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
              >
                <ExternalLink class="w-4 h-4" />
                {{ t('projects.demo') }}
              </a>
              <a
                :href="project.githubUrl"
                class="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center"
              >
                <Github class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
