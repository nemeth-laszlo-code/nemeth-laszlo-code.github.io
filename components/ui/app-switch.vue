<template>
    <label class="switch">
        <input type="checkbox" :checked="checked" @change="onChange" :disabled="disabled">
        <div>
            <span>
                <slot name="option"></slot>
            </span>
            <span>
                <slot name="option2"></slot>
            </span>
        </div>
        <span class="slider"></span>
    </label>
</template>

<script setup>

const props = defineProps({
    checked: Boolean,
    disabled: Boolean
});
const emit = defineEmits(['update:checked']);

function onChange(event) {
    emit('update:checked', event.target.checked);
}
</script>
<style scoped>
@reference "@/assets/css/main.css";
.switch {
    @apply flex items-center relative cursor-pointer
           rounded-[30px] h-8 font-normal
           bg-accent-2 text-text-2;
    padding: 0.2rem;
    width: calc(50px + 0.6rem);

    div {
        @apply absolute inset-0 rounded-[inherit]
               flex items-center justify-between
               z-20 pointer-events-none;
        padding-inline: 0.35rem;

        span {
            @apply flex items-center justify-center
                   transition-all duration-300
                   text-[0.7rem] leading-none;

            :deep(svg) {
                @apply w-4 h-4;
            }
        }
    }

    .slider {
        @apply absolute z-10 rounded-[30px]
               bg-bg-900 transition-all duration-300;
        width: 24px;
        aspect-ratio: 1;
        top: 50%;
        left: 0.2rem;
        transform: translateY(-50%);
    }

    input {
        @apply hidden;
    }

    input[type="checkbox"]:not(:checked) {
        & + div span:first-child {
            @apply opacity-0;
        }
    }

    input[type="checkbox"]:checked {
        & ~ .slider {
            transform: translateY(-50%) translateX(28px);
        }

        & + div span:last-child {
            @apply opacity-0;
        }
    }

    input[disabled] ~ .slider {
        @apply bg-gray-400;
    }
}

.switch:has(input[disabled]) {
    @apply cursor-default opacity-60;
}



</style>
