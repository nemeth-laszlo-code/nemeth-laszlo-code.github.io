<template>
    <div>
        <div class="progress-bar">
            <h3>{{ title }}</h3>

            <div class="progress-bar-fill" :style="{ width: progress + '%', '--width': progress + '%' }"></div>
        </div>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue';
const props = defineProps({
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    title: {
        type: String,
        required: true,
        default: 'Progress'
    }
});


</script>


<style lang="scss" scoped>
.progress-bar {
    width: 100%;
    height: 35px;
    background-color: var(--bg-color-900);
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    h3 {
        position: absolute;
        padding: 0 0.25rem;
        font-size: 1rem;
        background-color: var(--bg-color-900);
        opacity: 0.8;
        border-radius: 5px;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
    }
}

.progress-bar-fill {
    height: 100%;
    background-color: var(--color-1);

    transition: width 0.3s ease;
    border-radius: inherit;
    animation: load 0.5s forwards;
}


@keyframes load {
    0% {
        width: 0;
    }

    100% {
        width: var(--width);
    }

}
</style>