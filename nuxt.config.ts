// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxtjs/i18n"],
  css: ["~/assets/scss/main.scss"],
  app: {
    head: {
      title: "Németh László - Frontend Fejlesztő",
      meta: [
        {
          name: "description",
          content: "Németh László portfolió weboldala",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" },

        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "preload",
          href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&display=swap",
          as: "style",
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&display=swap",
        },
      ],
    },
  },
  i18n: {
    locales: [
      { code: "hu", iso: "hu-HU", name: "Magyar", file: "hu.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "hu",
    langDir: "locales/", // fontos!
    strategy: "prefix_except_default",
    vueI18n: "./i18n.config.ts", // külső konfiguráció fájl!
  },
  runtimeConfig: {
    public: {
      axios: {
        API_BASE: "http://localhost:3001/api/portfolio", // Itt add meg az API URL-t
      },
    },
  },
  image: {
    // Engedélyezett külső domain-ek
    domains: ["jrgenweb.github.io", "example.com"],

    // provider (pl. ipx)
    provider: "ipx",
    format: ["webp", "avif"],

    // ha cloudinary vagy más, akkor más beállítás kell
  },
});
