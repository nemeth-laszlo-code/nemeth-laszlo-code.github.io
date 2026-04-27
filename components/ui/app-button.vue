<template>
  <Transition name="fade" mode="out-in">
    <div :key="$i18n.locale" class="inline-block">
      <button 
        v-if="type !== 'link'"
        :disabled="disabled"
        :class="buttonClasses"
      >
        <slot />
      </button>

      <a 
        v-else
        :href="disabled ? undefined : href"
        :target="target"
        :class="[buttonClasses, { 'pointer-events-none opacity-60': disabled }]"
      >
        <slot />
      </a>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, // primary, secondary, outline
  size: { type: String, default: 'md' },       // sm, md
  target: String,
  href: String,
  disabled: Boolean,
  className: String // megmaradt extra osztályoknak, ha nagyon kell
})

const buttonClasses = computed(() => {
  return [
    // Alap stílusok (TW4)
    'inline-flex items-center justify-center rounded-sm font-medium uppercase no-underline transition-all duration-300 select-none cursor-pointer text-nowrap active:scale-90 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60',
    
    // Méretezés
    props.size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-5 py-2.5 text-sm',

    // Variánsok
    props.variant === 'primary' && 'bg-bg-500 text-text-1 border-b border-accent-4 hover:brightness-110 disabled:bg-bg-200 disabled:border-gray-500',
    
    props.variant === 'secondary' && 'bg-accent-2 text-text-1 hover:bg-accent-2/80 disabled:bg-gray-600 hover:text-white border-2    border-accent-2',

    props.variant === 'outline' && 'bg-transparent border-2 border-accent-2 text-text-1 hover:bg-accent-2 hover:text-white disabled:border-gray-500 disabled:text-gray-500',

    // Egyedi osztályok átpasszolása
    props.className
  ];
});
</script>

<style scoped>

</style>