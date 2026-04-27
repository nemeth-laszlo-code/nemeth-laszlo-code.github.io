<template>
    <Transition name="fade" mode="out-in">
        <div :key="$i18n.locale">

            <button :class="[className, { 'disabled': disabled }]" :disabled="disabled" v-if="type !== 'link'">
                <slot />
            </button>
            <a :class="[className, { 'disabled': disabled }]" :disabled="disabled" v-if="type === 'link'" :href="href"
                :target="target">
                <slot />
            </a>

        </div>
    </Transition>
</template>
<script setup>
import { Transition } from 'vue';

const props = defineProps({
    className: String,
    type: String,
    target: String,
    href: String,
    disabled: Boolean
})
</script>

<style scoped>
button,
a {
    padding: 10px 20px;
    text-transform: uppercase;
    background-color: var(--bg-color-500);
    border: 0;
    border-bottom: 1px solid var(--accent-color-4);
    outline: none;
    cursor: pointer;
    color: var(--text-color-1);
    border-radius: 5px;
    transition: 0.3s all;
    text-wrap: nowrap;


    &:active {
        scale: 0.9;
    }

    &:disabled,
    &[disabled="true"] {
        background-color: var(--bg-color-200);
        border-bottom-color: gray;
        cursor: not-allowed;
        opacity: 0.6;
        scale: 1 !important;
        pointer-events: none;
    }
}

a {
    text-decoration: none;
    display: inline-block;
}



button.secondary,
a.secondary {

    background-color: var(--accent-color-2);
    background-color: transparent;


    border: 0;
    outline: 2px solid var(--accent-color-2);




    &:hover {
        background-color: var(--accent-color-2);
    }

    &.sm {
        padding: 5px 10px;
        font-size: 0.75rem;
    }

    &:disabled,
    &[disabled="true"] {
        outline-color: gray;
        color: gray;
        background-color: transparent;
    }

}

@media screen and (max-width:600px) {

    button,
    a {
        padding: 8px 16px;
    }

}
</style>