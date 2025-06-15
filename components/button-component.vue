<template>
    <div>
        <button :class="className">
            <slot />
        </button>
    </div>
</template>
<script setup>
const props = defineProps({
    className: String
})
</script>

<style lang="scss" scoped>
button {
    padding: 10px 20px;
    text-transform: uppercase;
    background-color: #3282b8;
    border: 0;
    border-bottom: 1px solid limegreen;
    outline: none;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    transition: 0.3s all;

    &:active {
        scale: 0.8;
    }
}

button.secondary {

    background-color: yellowgreen;
    background-color: transparent;

    //padding: 5px 10px;
    border: 0;
    outline: 2px solid yellowgreen;


    &:hover {
        background-color: yellowgreen;
    }

}
</style>