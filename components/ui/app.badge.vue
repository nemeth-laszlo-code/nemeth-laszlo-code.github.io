<template>
  <span :class="['badge', variant, mode]">
    <slot></slot>
  </span>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  // Színvonal: primary, secondary, muted, default
  variant: {
    type: String,
    default: 'default'
  },
  // Megjelenés: filled (alapértelmezett), outline
  mode: {
    type: String,
    default: 'filled'
  }
})

const { variant, mode } = toRefs(props)
</script>

<style scoped>
@reference "@/assets/css/main.css";

.badge {
  @apply inline-flex items-center justify-center
         px-2 py-0.5 lg:px-4 lg:py-1 rounded-md text-[10px] lg:text-xs 
         gap-2 font-medium transition-all duration-200 text-nowrap
         border border-transparent outline-0 ;

  /* --- FILLED (Kitöltött) stílusok --- */
  &.filled {
    &.primary { @apply bg-accent-1 text-white; }
    &.secondary { @apply bg-accent-2 text-white; }
    &.muted { @apply bg-bg-800 text-text-1 opacity-70; }
    &.default { @apply bg-bg-500 text-text-1; }
  }

  /* --- OUTLINE stílusok --- */
  &.outline {
    @apply bg-transparent;
    
    &.primary { @apply border-accent-1 text-accent-1; }
    &.secondary { @apply border-accent-2 text-accent-2; }
    &.muted { @apply border-bg-500 text-text-1 opacity-60; }
    &.default { @apply border-bg-500 text-text-1; }
  }
}
</style>