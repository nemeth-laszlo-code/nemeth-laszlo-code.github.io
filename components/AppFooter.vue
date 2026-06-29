<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <footer class="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-black text-white">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 flex items-center gap-2">
          © 2026 Németh László. {{ t('footer.madeWith') }}
          <Heart class="w-4 h-4 text-red-500 inline" />
          {{ t('footer.using') }}
        </p>
        <div class="flex gap-6 text-gray-400 text-sm">
          <a href="#" class="hover:text-emerald-400 transition-colors">{{ t('footer.privacy') }}</a>
          <a href="#" class="hover:text-emerald-400 transition-colors">{{ t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
