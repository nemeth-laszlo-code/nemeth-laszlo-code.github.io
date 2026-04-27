<template>
    <span :class="['badge', variant]">
        <slot></slot>
    </span>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'default'
    }
})

const { variant } = toRefs(props)
</script>

<style scoped>
@reference "@/assets/css/main.css";
 
.badge {
    @apply inline-flex items-center justify-center
           px-2 py-0.5 lg:px-3 lg:py-1.5 rounded-md text-xs font-medium
           transition-all duration-200 text-nowrap;

    &.default {
        @apply bg-bg-500 text-text-2;
    }

    &.primary {
        @apply bg-accent-1 text-text-1;
    }

    &.secondary {
        @apply bg-accent-2 text-text-2;
    }

    &.outline {
        @apply bg-transparent text-text-1 ring-1 ring-accent-2;
    }

    &.muted {
        @apply bg-bg-800 text-text-1 opacity-70;
    }
}
</style>