<template>
    <div class="panel">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.panel {
    background-color: var(--bg-color-800);

    padding: 1.75rem;
    margin-block: 1rem;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    max-height: fit-content;
}



.panel::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;

    border-radius: inherit;
    border: 1px solid transparent;
    background: linear-gradient(60deg, var(--bg-color-800), var(--bg-color-900)) padding-box;
    mask:
        linear-gradient(black) border-box,
        linear-gradient(black) padding-box;
    mask-composite: substract;
}


@media screen and (max-width:768px) {
    .panel {
        padding: 1rem;
    }
}
</style>