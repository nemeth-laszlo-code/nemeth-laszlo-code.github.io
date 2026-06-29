<script setup lang="ts">
const { t } = useI18n()
const { el, isVisible } = useScrollReveal()

const skillCategories = computed(() => [
  {
    category: t('skills.categories.frontend'),
    skills: ['Angular', 'TypeScript', 'Vue.js/Nuxt', 'HTML/CSS/SCSS'],
  },
  {
    category: t('skills.categories.tools'),
    skills: ['Git/GitHub', 'Responsive Design', 'RxJS', 'NPM/Package Managers'],
  },
  {
    category: t('skills.categories.backend'),
    skills: ['NestJS', 'PostgreSQL', 'REST APIs', 'Node.js'],
  },
])
</script>

<template>
  <section
    id="skills"
    ref="el"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div
        :class="[
          'text-center mb-12',
          isVisible ? 'animate-fade-in-up' : 'opacity-0',
        ]"
      >
        <h2 class="mb-4 text-3xl sm:text-4xl">{{ t('skills.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          {{ t('skills.subtitle') }}
        </p>
      </div>

      <!-- Skill categories -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(category, categoryIndex) in skillCategories"
          :key="category.category"
          :class="[
            'bg-white dark:bg-slate-800 p-6 rounded-xl',
            isVisible ? 'animate-fade-in-up' : 'opacity-0',
          ]"
          :style="{ animationDelay: `${categoryIndex * 100}ms` }"
        >
          <h3 class="mb-6 text-emerald-600 dark:text-emerald-400">
            {{ category.category }}
          </h3>
          <div class="space-y-4">
            <div v-for="(skill, skillIndex) in category.skills" :key="skill">
              <div class="mb-2">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ skill }}</span>
              </div>
              <div class="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-700 ease-out"
                  :style="{
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${categoryIndex * 100 + skillIndex * 80}ms`,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
