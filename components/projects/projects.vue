<template>
    <div class="projects">
        <card-component :data="project" :key="project.name" v-for="project in projects" />
        <!-- <div v-if="error">Hiba történt az adatok betöltésekor: {{ error.message }}</div>  -->
        <div v-if="projects.length === 0">
            Nincsenek elérhető projektek
        </div>
    </div>
</template>

<script setup lang="ts">
import CardComponent from '~/components/projects/card-component.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

import { ref, onMounted } from 'vue'
import type { Project } from '~/types/project';




const projects = ref<Project[]>([])
const loading = ref(true)

const username = 'jrgenweb'  // GitHub username

// Csak ezek a projektek kerülnek a portfólióba
const projectsList = ['hangman-game', 'frontend-quiz-app', 'shop']

onMounted(async () => {
    // 1️⃣ Publikus repók lekérése
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100/languages`)
    const data = await res.json()

    if (res.ok) {

        const projectPromises = data.map(async (repo: any) => {
            // Csak a Projects listában szereplő repókat nézzük
            if (!projectsList.includes(repo.name)) return null


            //preview jpg url-je
            let previewUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/HEAD/preview.jpg`
            const previewRes = await fetch(previewUrl)
            if (!previewRes.ok) previewUrl = 'https://placehold.co/600x400/EEE/31343C'  // ha nincs preview.jpg akkor egy alapértelmezzett képet adunk meg


            //readme fajl url-je
            const readmeUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/HEAD/README.md`
            const readmeRes = await fetch(readmeUrl)
            const readme = readmeRes.ok ? await readmeRes.text() : ''


            // program nyelvek a tag-hez
            const langRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`)
            const languages = Array.from(Object.keys((langRes.ok ? await langRes.json() : {})));



            //live url

            const liveUrl = "https://api.github.com/repos/jrgenweb/hangman-game/about";
            const liveRes = await fetch(liveUrl);
            const live = liveRes.ok ? await liveRes.json() : {}


            const descriptionHuUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/HEAD/DESCRIPTION_HU.md`
            const descriptionHuRes = await fetch(descriptionHuUrl)
            const description_hu = descriptionHuRes.ok ? await descriptionHuRes.text() : ''


            const descriptionEnUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/HEAD/DESCRIPTION_EN.md`
            const descriptionEnRes = await fetch(descriptionEnUrl)
            const description_en = descriptionHuRes.ok ? await descriptionEnRes.text() : ''






            return {
                name: repo.name,
                html_url: repo.html_url,
                previewUrl,
                live_url: repo.homepage,
                description: ref(locale.value === 'hu' ? description_hu : description_en).value,
                readme,
                languages
            } as Project
        })
        projects.value = (await Promise.all(projectPromises)).filter(Boolean) as Project[]
        console.log(projects.value, 'ok')
        loading.value = false;
    } else if (res.status === 403) {
        console.error('Rate limit')
    }


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