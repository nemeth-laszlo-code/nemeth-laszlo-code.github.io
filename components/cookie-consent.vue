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
    right: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    color: var(--text-color);
    padding: 1rem;
    border-radius: 0.5rem;
    
    display: flex;
    align-items: center;
    gap: 1rem;

    & button {
        background-color: var(--accent-color-1, green);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        color: black;
    }
}
</style>