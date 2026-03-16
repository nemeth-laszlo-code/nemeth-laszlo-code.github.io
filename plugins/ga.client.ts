// plugins/ga.client.ts
export default defineNuxtPlugin(() => {
  const GA_ID = useRuntimeConfig().public.GA_ID;
  const consent = localStorage.getItem("cookiesAccepted");

  if (consent === "true") {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    (document.head as HTMLHeadElement).appendChild(script);
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }
});
