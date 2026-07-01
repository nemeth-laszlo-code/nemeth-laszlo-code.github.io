<script setup lang="ts">
const { isTransitioning } = useLocaleTransition()
const { locale } = useI18n()

const seoTitle = computed(() =>
  locale.value === 'hu'
    ? 'Németh László | Frontend Fejlesztő'
    : 'Németh László | Frontend Developer'
)

const seoDescription = computed(() =>
  locale.value === 'hu'
    ? 'Junior Frontend Fejlesztő, Angular és Vue.js specialista. Reszponzív webalkalmazások fejlesztése TypeScript, RxJS és modern frontend eszközökkel.'
    : 'Junior Frontend Developer specializing in Angular and Vue.js. Building responsive web applications with TypeScript, RxJS, and modern frontend tools.'
)

useHead({
  htmlAttrs: { lang: () => locale.value },
})

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogType: 'website',
  ogImage: 'https://nemeth-laszlo-code.github.io/images/share_preview.png',
  ogImageAlt: 'Németh László – Frontend Developer',
  twitterCard: 'summary_large_image',
  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDescription.value,
  twitterImage: 'https://nemeth-laszlo-code.github.io/images/share_preview.png',
  robots: 'index, follow',
  author: 'Németh László',
})
</script>

<template>
  <div class="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen">
    <AppNavigation />
    <main
      :class="['transition-opacity duration-150', isTransitioning ? 'opacity-0' : 'opacity-100']"
    >
      <AppHero />
      <AppAbout />
      <AppSkills />
      <AppProjects />
      <AppContact />
    </main>
    <AppFooter />
    <MobileContactButton />
    <CookieBanner />
  </div>
</template>
