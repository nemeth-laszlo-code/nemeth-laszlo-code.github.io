<script setup lang="ts">
import { Moon, Sun, Home } from 'lucide-vue-next'

defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()

const { t, locale } = useI18n()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

useHead({
  htmlAttrs: { lang: () => locale.value },
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors px-4">
    <button @click="toggleTheme"
      class="absolute top-6 right-6 p-2 rounded-lg bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
      <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />
      <Moon v-else class="w-5 h-5 text-slate-700" />
    </button>

    <a href="/" class="absolute top-6 left-6 text-xl font-bold text-emerald-500">NL_dev</a>

    <div class="relative text-center max-w-lg animate-fade-in-scale">
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full blur-2xl opacity-30" />

      <p class="text-8xl sm:text-9xl font-bold bg-gradient-to-br from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
        {{ error?.statusCode ?? 404 }}
      </p>

      <h1 class="mt-4 text-2xl sm:text-3xl font-bold">
        {{ t('notFound.title') }}
      </h1>
      <p class="mt-3 text-gray-600 dark:text-gray-400">
        {{ t('notFound.description') }}
      </p>

      <button @click="goHome"
        class="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl font-semibold">
        <Home class="w-5 h-5" />
        {{ t('notFound.backHome') }}
      </button>
    </div>
  </div>
</template>
