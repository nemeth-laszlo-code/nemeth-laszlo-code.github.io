<script setup lang="ts">
import { Menu, X, Moon, Sun } from 'lucide-vue-next'

const { t, locale, locales } = useI18n()
const { switchLocale, fadeAndNavigate } = useLocaleTransition()

async function handleNavClick(href: string) {
  isMobileMenuOpen.value = false
  await fadeAndNavigate(href)
}
const colorMode = useColorMode()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = computed(() => [
  { href: '#about', label: t('nav.about') },
  { href: '#skills', label: t('nav.skills') },
  { href: '#projects', label: t('nav.projects') },
  { href: '#contact', label: t('nav.contact') },
])

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const otherLocale = computed(() =>
  locales.value.find((l) => l.code !== locale.value)
)
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled
      ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg'
      : 'bg-transparent',
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <a href="#" class="text-2xl font-bold text-emerald-500">NL_dev</a>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-8">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" @click.prevent="handleNavClick(link.href)"
            class="text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer">
            {{ link.label }}
          </a>

          <!-- Language switcher -->
          <button v-if="otherLocale" @click="switchLocale(otherLocale.code)"
            class="px-3 py-1 rounded-lg text-sm font-semibold border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
            {{ otherLocale.name }}
          </button>

          <!-- Dark mode toggle -->
          <ClientOnly>
            <button @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
              <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />
              <Moon v-else class="w-5 h-5 text-slate-700" />
            </button>
            <template #fallback>
              <div class="w-9 h-9 rounded-lg bg-gray-200 dark:bg-slate-800" />
            </template>
          </ClientOnly>
        </div>

        <!-- Mobile controls -->
        <div class="md:hidden flex items-center gap-3">
          <button v-if="otherLocale" @click="switchLocale(otherLocale.code)"
            class="px-2 py-1 rounded text-xs font-semibold border border-emerald-500 text-emerald-600 dark:text-emerald-400">
            {{ otherLocale.code.toUpperCase() }}
          </button>
          <ClientOnly>
            <button @click="toggleTheme" class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
              <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />
              <Moon v-else class="w-5 h-5 text-slate-700" />
            </button>
            <template #fallback>
              <div class="w-9 h-9 rounded-lg bg-gray-200 dark:bg-slate-800" />
            </template>
          </ClientOnly>
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu">
            <X v-if="isMobileMenuOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
      <div v-if="isMobileMenuOpen"
        class="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <div class="px-4 py-4 space-y-3">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" @click.prevent="handleNavClick(link.href)"
            class="block text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-2 cursor-pointer">
            {{ link.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
