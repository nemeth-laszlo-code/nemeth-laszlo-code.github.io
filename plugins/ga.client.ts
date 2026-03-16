export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const GA_ID = config.public.GA_TRACKING_ID;

  // Függvény a GA inicializálására
  const initGA = () => {
    if (process.server || (window as any).gtag) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  };

  // Ellenőrizzük a hozzájárulást
  const consent = localStorage.getItem("cookiesAccepted");
  if (consent === "true") {
    initGA();
  }

  // Oldalváltások figyelése (SPA navigációhoz)
  nuxtApp.vueApp.mixin({
    mounted() {
      if (
        localStorage.getItem("cookiesAccepted") === "true" &&
        (window as any).gtag
      ) {
        useRouter().afterEach((to) => {
          (window as any).gtag("config", GA_ID, {
            page_path: to.fullPath,
          });
        });
      }
    },
  });
});
