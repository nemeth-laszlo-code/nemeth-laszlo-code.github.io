<template>

            <app-panel id="projects" >
                <Transition name="fade" mode="out-in">
                    <div :key="$i18n.locale">
                        <h2 class="mb-4 text-h2 uppercase">{{ $t('projects.h2') }}</h2>
                        <p>{{ $t('projects.p') }}</p>
                    </div>
                </Transition>
                <div class="projects  gap-4 lg:gap-6">
                    <card-component v-for="project in projects" :key="project.title" :data="project" @open="openProject" />

                    <div v-if="projects.length === 0">
                        <h3 class="text-h3 uppercase text-center mt-4">  Nincsenek elérhető projektek</h3>
                    </div>

                    <project-modal :show="Boolean(selectedProject)" :project="selectedProject" @close="closeModal" />
                </div>            
            </app-panel>


    
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

<style scoped>
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    
    margin-top: 2rem;
}
</style>