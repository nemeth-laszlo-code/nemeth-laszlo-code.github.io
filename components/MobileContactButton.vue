<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-75">
    <a v-if="isVisible" href="#contact"
      class="md:hidden fixed bottom-6 right-6 z-40 p-4 bg-emerald-700 text-white rounded-full shadow-2xl hover:bg-emerald-800 transition-all hover:scale-110 animate-bounce"
      aria-label="Contact me">
      <MessageCircle class="w-6 h-6" />
    </a>
  </Transition>
</template>
