<template>
    <app-panel>
        <header class="header">
            <div class="header-text self-end">
                <Transition name="fade" mode="out-in">
                    <div class="header-content " :key="$i18n.locale">
                        <p class="text-text-1/70  ">{{ $t('header.p') }}</p>
                        <h1 class="text-h1 uppercase mt-4">{{ $t('header.h1') }}</h1>
                        <h2 class="text-h2 uppercase mt-2">{{ $t('header.h3') }}</h2>
                    </div>
                </Transition>
            </div>
            <div class="header-social">
                <social-links class=""></social-links>
                <app-button variant="outline"   type="link" :href="cv_url" target="_blank">{{ $t('header.cv')
                }}</app-button>
            </div>
            <div class="header-image">
                <div class="image-glow"></div>
                <div class="image">

                    <NuxtImg src="/images/profile.jpg" format="webp" width="300" height="300" loading="eager"
                        alt="Németh László profil kép"></NuxtImg>
                </div>
            </div>
        </header>

    </app-panel>




</template>
<script setup>
const { locale } = useI18n();

// A nyelv változtatásakor frissülő link
const cv_url = computed(() =>
    locale.value === 'hu'
        ? '/CV/nemeth_laszlo_frontend_fejleszto_cv.pdf'
        : '/CV/nemeth_laszlo_frontend_developer_cv.pdf'
);

</script>

<style scoped>
@reference "@/assets/css/main.css";
.header {
  --animation-duration: 30s;
  --gradient-deg: 180deg;
  --gradient-width: 10deg;

  display: grid;
  gap: 2rem;
  position: relative;
  z-index: 10;
  
  
  /* Alapértelmezett (Mobil): 1 oszlop, 3 sor */
  grid-template-columns: 1fr;
  grid-template-areas: 
    "content"
    "image"
    "social";

  /* Desktop (768px felett) */
  @media (min-width: 768px) {
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto auto;
    grid-template-areas: 
      "content image"
      "social  image";
    gap: 1rem;
  }
}

.header-text { grid-area: content; }
.header-social { 
  grid-area: social;
  @apply flex flex-wrap items-center  justify-evenly gap-4 md:justify-start md:gap-16;
}

.header-image { 
  grid-area: image;
  @apply relative w-[280px] md:w-[300px] aspect-square rounded-full justify-self-center md:justify-self-end self-center;

    .image-glow {

    @apply absolute -inset-[8px] rounded-full;

    &::before, &::after {
      @apply absolute inset-0 rounded-full content-[''];
      background: conic-gradient(
        from var(--gradient-deg) at 50% 50%,
        var(--accent-color-2) var(--gradient-width),
        transparent var(--gradient-width)
      );
    }

    &::before { animation: rotateConicGradient 10s linear infinite; }
    &::after  { animation: rotateConicGradient2 var(--animation-duration) linear infinite; }
  }
  .image {
    @apply relative z-10 aspect-square w-full rounded-full border-4 border-accent-2 bg-accent-2 overflow-hidden;
    box-shadow: 0 0 0 5px var(--bg-color-900);

    & img {
      @apply h-full w-full rounded-full object-cover grayscale-50;
    }
   
  }
}
@keyframes rotateConicGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes rotateConicGradient2 { from { transform: rotate(180deg); } to { transform: rotate(540deg); } }
</style>


