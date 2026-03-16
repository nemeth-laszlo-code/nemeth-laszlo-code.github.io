<template>

  <div class="cookie-consent" v-show="show">
    <span>Ez az oldal sütiket használ a statisztikához.</span>
    <button-component @click="accept">
      ✔ Elfogadom
    </button-component>


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

<style lang="scss" scoped>
.cookie-consent {
  position: fixed;
  z-index: 9999;
  bottom: 1rem;
  right: 50%;
  transform: translateX(50%);
  background-color: var(--bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(60px);
  color: var(--text-color);
  padding: 1rem;
  border-radius: 0.5rem;

  display: flex;

  align-items: center;
  text-align: center;
  gap: 1rem;
  width: max-content;



}

@media screen and (max-width: 600px) {
  .cookie-consent {
    flex-direction: column;
    align-items: center;
  }
}
</style>