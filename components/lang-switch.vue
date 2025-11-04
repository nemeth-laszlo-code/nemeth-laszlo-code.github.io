<template>
    <base-switch :disabled="disabled" :checked="locale === 'en'" @change="toggleLang">
        {{ locale.value }}
        <template #option2>HU</template>
        <template #option>EN</template>
    </base-switch>
</template>
<script setup>
const { locale, setLocale } = useI18n();
const props = defineProps({
    disabled: Boolean,
    checked: Boolean
})




onMounted(() => {
    props.checked = locale.value === 'en' ? true : false;
    //console.log(props.checked, locale.value)
})



function toggleLang(event) {
    setLocale(event.target.checked ? 'en' : 'hu');
}

</script>
<style lang="scss" scoped></style>