<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

const showBanner = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (consent === 'accepted') {
    loadGA()
  } else if (consent === null) {
    showBanner.value = true
  }
})

function loadGA() {
  const id = config.public.gaTrackingId
  if (!id) return

  const s1 = document.createElement('script')
  s1.async = true
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s1)

  const s2 = document.createElement('script')
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`
  document.head.appendChild(s2)
}

function accept() {
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
  loadGA()
}

function decline() {
  localStorage.setItem('cookie-consent', 'declined')
  showBanner.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="showBanner"
      class="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p class="text-sm text-gray-600 dark:text-gray-400 flex-1 text-center sm:text-left">
          🍪 {{ t('cookies.message') }}
        </p>
        <div class="flex gap-3 shrink-0">
          <button
            @click="decline"
            class="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-slate-600 rounded-lg hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
          >
            {{ t('cookies.decline') }}
          </button>
          <button
            @click="accept"
            class="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            {{ t('cookies.accept') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
