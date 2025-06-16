<template>
    <div class="projects">
        <card-component :data="project" :key="project.id" v-for="project in currentLangProjects" />
        <div v-if="error">Hiba történt az adatok betöltésekor: {{ error.message }}</div>
    </div>
</template>

<script setup lang="ts">
import CardComponent from '~/components/projects/card-component.vue'

const config = useRuntimeConfig()
const { locale } = useI18n();


const { data: projects, error } = await useAsyncData('projects', () =>
    $fetch(`${config.public.axios.API_BASE}`)
)

if (error.value) {
    console.error('API hiba:', error.value)
}


const currentLangProjects = computed(() => {
    return projects.value?.map(project => ({
        title: locale.value === 'hu' ? project.title_hu : project.title_en,
        description: locale.value === 'hu' ? project.description_hu : project.description_en,
        live_url: project.live_url,
        github_url: project.github_url,
        img_url: project.img_url,
        tags: project.tags,
        created_at: project.created_at
    })) || []
})


</script>
<style lang="scss" scoped>
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}
</style>