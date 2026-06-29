<script setup lang="ts">
const { isTransitioning } = useLocaleTransition()
</script>

<template>
  <div class="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen">
    <AppNavigation />
    <div
      :class="['transition-opacity duration-150', isTransitioning ? 'opacity-0' : 'opacity-100']"
    >
      <AppHero />
      <AppAbout />
      <AppSkills />
      <AppProjects />
      <AppContact />
      <AppFooter />
    </div>
    <MobileContactButton />
  </div>
</template>
