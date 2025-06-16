<template>
    <div>

        <button :class="className" v-if="type !== 'link'">
            <slot />
        </button>
        <a :class="className" v-if="type === 'link'" :href="href" :target="target">
            <slot />
        </a>

    </div>
</template>
<script setup>
const props = defineProps({
    className: String,
    type: String,
    target: String,
    href: String
})
</script>

<style lang="scss" scoped>
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
        scale: 0.8;
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

}
</style>