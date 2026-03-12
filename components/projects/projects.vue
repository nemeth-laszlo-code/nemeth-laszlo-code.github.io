<template>
    <div class="projects">
        <card-component v-for="project in projects" :key="project.title" :data="project" />
        <div v-if="projects.length === 0">
            Nincsenek elérhető projektek
        </div>
    </div>
</template>

<script setup lang="ts">
import CardComponent from '~/components/projects/card-component.vue'
import { computed } from 'vue'
import { useI18n } from '#imports'
import projectsHu from '~/data/projects/hu.json'
import projectsEn from '~/data/projects/en.json'

interface PortfolioProject {
    title: string
    description: string
    imgurl: string
    github: string
    liveurl: string
}

const { locale } = useI18n()

const projects = computed<PortfolioProject[]>(() =>
    (locale.value === 'hu' ? projectsHu : projectsEn) as PortfolioProject[]
)
</script>

<style lang="scss" scoped>
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}
</style>