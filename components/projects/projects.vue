<template>

    <div class="projects">

        <card-component :data="project" :key="project.id" v-for="project in projects" />
        <div v-if="error">Hiba történt az adatok betöltésekor: {{ error.message }}</div>

    </div>


</template>

<script setup lang="ts">
import CardComponent from '~/components/projects/card-component.vue'

const config = useRuntimeConfig()


const { data: projects, error } = await useAsyncData('projects', () =>
    $fetch(`${config.public.axios.API_BASE}`)
)

if (error.value) {
    console.error('API hiba:', error.value)
}





</script>
<style lang="scss" scoped>
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;


}
</style>