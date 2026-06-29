import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n'],
  colorMode: {
    classSuffix: '',
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
    },
  },
})
