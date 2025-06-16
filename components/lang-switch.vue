<template>
    <base-switch :disabled="disabled" :checked="lang === 'en'" @change="toggleLang">
        {{ locale.value }}
        <template #option2>HU</template>
        <template #option>EN</template>
    </base-switch>
</template>
<script setup>

const props = defineProps({
    disabled: Boolean
})


const { locale, setLocale } = useI18n();


const lang = ref(locale.value);

function toggleLang(event) {
    setLocale(event.target.checked ? 'en' : 'hu');
}

</script>
<style lang="scss" scoped></style>