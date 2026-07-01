<script setup lang="ts">
import { Github, Linkedin, Mail, FileText, Award } from 'lucide-vue-next'

const { t, locale } = useI18n()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <section
    class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <div class="max-w-6xl mx-auto w-full">
      <!-- Seeking banner -->
      <div :class="['mb-8 text-center', isMounted ? 'animate-fade-in-up' : 'opacity-0']">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
          <Award class="w-4 h-4" />
          {{ t('hero.seeking') }}
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: text -->
        <div :class="isMounted ? 'animate-fade-in-left' : 'opacity-0'" style="animation-delay: 200ms">
          <p class="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
            {{ t('hero.greeting') }}
          </p>
          <h1 class="mb-3 text-4xl sm:text-5xl lg:text-6xl">{{ t('hero.name') }}</h1>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl mb-4 text-gray-700 dark:text-gray-300">
            {{ t('hero.title') }}
          </h2>
          <p class="text-lg sm:text-xl text-emerald-600 dark:text-emerald-400 font-semibold mb-6">
            {{ t('hero.subtitle') }}
          </p>
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {{ t('hero.description') }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="#contact"
              class="px-8 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl font-semibold text-center">
              {{ t('hero.getInTouch') }}
            </a>
            <a :href="t('hero.cvUrl')"
              :download="t('hero.cvUrl') !== '#' ? t('hero.cvUrl').split('/').pop() : undefined"
              :target="t('hero.cvUrl') !== '#' ? '_blank' : undefined"
              class="px-8 py-4 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all font-semibold flex items-center justify-center gap-2"
              :class="{ 'opacity-50 cursor-not-allowed': t('hero.cvUrl') === '#' }">
              <FileText class="w-5 h-5" />
              {{ t('hero.downloadCV') }}
            </a>
          </div>

          <!-- Social links -->
          <div class="flex gap-4">
            <a href="https://github.com/nemeth-laszlo-code" target="_blank" rel="noopener noreferrer"
              class="p-3 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 transition-all"
              aria-label="GitHub">
              <Github class="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/nemethlaszlocode/" target="_blank" rel="noopener noreferrer"
              class="p-3 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 transition-all"
              aria-label="LinkedIn">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="mailto:nemeth.laszlo.code@gmail.com"
              class="p-3 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 transition-all"
              aria-label="Email">
              <Mail class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Right: avatar -->
        <div :class="['flex justify-center lg:justify-end', isMounted ? 'animate-fade-in-scale' : 'opacity-0']"
          style="animation-delay: 400ms">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full blur-2xl opacity-30" />
            <div
              class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl">
              <div
                class="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <NuxtImg src="/images/profile.jpg" alt="Nemeth Laszlo profile picture"
                  title="Nemeth laszlo profile picture" width="320" height="320" fit="cover" format="webp"
                  sizes="(min-width: 640px) 320px, 256px" class="w-full h-full object-cover" preload />
                <!--<span class="text-6xl sm:text-8xl font-bold text-white dark:text-slate-900">NL</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
