<template>
    <div class="projects">
        <card-component v-for="project in projects" :key="project.title" :data="project" @open="openProject" />

        <div v-if="projects.length === 0">
            Nincsenek elérhető projektek
        </div>

        <project-modal :show="Boolean(selectedProject)" :project="selectedProject" @close="closeModal" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '#imports'
import CardComponent from './card-component.vue'
import ProjectModal from '~/components/sections/projects/project-modal.vue'
import projectsHu from '~/data/projects/hu.json'
import projectsEn from '~/data/projects/en.json'

interface PortfolioProject {
    title: string
    description: string
    imgurl: string
    github: string
    liveurl: string
    tags: string[]
}

const { locale } = useI18n()

const projects = computed<PortfolioProject[]>(() =>
    (locale.value === 'hu' ? projectsHu : projectsEn) as PortfolioProject[]
)

const selectedProject = ref<PortfolioProject | null>(null)

const openProject = (project: PortfolioProject) => {
    selectedProject.value = project
}

const closeModal = () => {
    selectedProject.value = null
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