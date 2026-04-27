<template>

  <div class="cookie-consent" v-show="show">
    <span>{{ $t('cookies.message') }}</span>
    <app-button @click="accept">
      ✔ {{ $t('cookies.button') }}
    </app-button>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(false)

const accept = () => {
  localStorage.setItem('cookiesAccepted', 'true')
  show.value = false
  location.reload() // GA betöltéshez
}

onMounted(() => {
  const consent = localStorage.getItem('cookiesAccepted')
  if (consent !== 'true') show.value = true
})
</script>

<style scoped>
@reference "@/assets/css/main.css";

.cookie-consent {
  @apply fixed z-[9999] bottom-4 right-1/2 translate-x-1/2
         shadow-[0_2px_8px_rgba(0,0,0,0.2)] backdrop-blur-[60px]
         p-4 rounded-lg
         flex items-center text-center gap-4 w-max
         flex-col sm:flex-row;

  background-color: var(--bg-color);
  color: var(--text-color);
}

</style>