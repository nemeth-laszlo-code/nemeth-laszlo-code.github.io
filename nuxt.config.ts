// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxtjs/i18n"],
  css: ["~/assets/scss/main.scss"],
  ssr: false,
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

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: "hu",
      // redirectOn: "root",
    },
    langDir: "locales/", // fontos!
    strategy: "prefix_except_default",
    // strategy: "prefix",
    lazy: true, // <--- fontos!
    vueI18n: "./i18n.config.ts", // külső konfiguráció fájl!
  },
  runtimeConfig: {
    public: {
      axios: {
        //API_BASE: "http://localhost:3001/api/portfolio", // Itt add meg az API URL-t
        //API_BASE: "http://api.jrgen.hu/api/portfolio", // Itt add meg az API URL-t
        API_BASE: "https://api.github.com/users/",
      },
    },
  },
  image: {
    // Engedélyezett külső domain-ek
    domains: ["jrgenweb.github.io", "placehold.co"],

    // provider (pl. ipx)
    provider: "vercel",
    dir: "public", // ez az alapértelmezett
    format: ["webp", "avif"],
    options: {
      baseURL: "/public/", // alapértelmezett
    },

    // ha cloudinary vagy más, akkor más beállítás kell
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/mixins.scss" as *;`,
        },
      },
    },
  },
});
