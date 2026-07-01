import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'color-scheme', content: 'light dark' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxt/image'],
  colorMode: {
    classSuffix: '',
  },
  image: {
    quality: 80,
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'hu', name: 'Magyar', file: 'hu.json' },
    ],
    langDir: 'locales/',
    strategy: 'no_prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  runtimeConfig: {
    public: {
      emailjsServiceId: '',
      emailjsTemplateId: '',
      emailjsPublicKey: '',
      gaTrackingId: '',
    },
  },
})
