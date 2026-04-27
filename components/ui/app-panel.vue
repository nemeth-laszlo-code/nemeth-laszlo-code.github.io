<template>
    <div class="panel">
        <slot></slot>
    </div>
</template>

<style lang="css">
@reference "@/assets/css/main.css";
.panel {
    @apply p-4 md:p-6 bg-bg-800 rounded-[10px] relative z-[1];
    max-height: fit-content;

   
}
.panel::before {
        @apply content-[''] absolute inset-0 z-[-1];
        border-radius: inherit;
        border: 1px solid transparent;
        background: linear-gradient(60deg, var(--bg-color-800), var(--bg-color-900)) padding-box;
        mask:
            linear-gradient(black) border-box,
            linear-gradient(black) padding-box;
        mask-composite: substract;
}






</style>