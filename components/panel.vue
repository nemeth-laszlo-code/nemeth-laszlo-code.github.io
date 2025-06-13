<template>
    <div class="panel">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.panel {
    background-color: var(--bg-color-800);

    padding: 1rem;
    margin-block: 1rem;
    border-radius: 10px;
    position: relative;
    z-index: 1
}
</style>