<template>
    <teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="modal" @click.self="emit('close')">
                <div class="modal-content" role="dialog" aria-modal="true" aria-label="Projekt részletei">
                    <button class="modal-close" type="button" @click="emit('close')" aria-label="Bezárás">×</button>

                    <div class="modal-header">
                        <h2>{{ activeProject?.title }}</h2>
                    </div>

                    <div class="modal-body">
                        <div class="modal-image">
                            <NuxtImg v-if="activeProject?.imgurl" :src="activeProject.imgurl"
                                :alt="activeProject.title + ' projekt képe'" format="webp" width="800" height="450" />
                        </div>
                        <p v-html="activeProject?.description" class="project-description"></p>

                        <div v-if="activeProject?.tags?.length" class="project-tags">
                            <span class="tag" v-for="tag in activeProject.tags" :key="tag">{{ tag }}</span>
                        </div>

                        <div class="project-actions">
                            <button-component v-if="activeProject?.github" type="link" className="secondary"
                                :href="activeProject.github" target="_blank">
                                Github
                            </button-component>

                            <button-component v-if="activeProject?.liveurl" type="link" className="secondary"
                                :href="activeProject.liveurl" target="_blank">
                                Live
                            </button-component>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount, ref } from 'vue'

interface PortfolioProject {
    title: string
    description: string
    imgurl: string
    github?: string
    liveurl?: string
    tags?: string[]
}

const props = defineProps<{
    show: boolean
    project: PortfolioProject | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

// Adatpufferelés: megőrizzük az utolsó projektet a bezárás animáció alatt
const activeProject = ref<PortfolioProject | null>(props.project)

watch(
    () => props.project,
    (newProject) => {
        if (newProject) {
            activeProject.value = newProject
        }
    },
    { immediate: true }
)

// Ne engedjük a body görgetését, amikor fent a modal
const setBodyOverflow = (value: string) => {
    if (process.client) document.body.style.overflow = value
}

watch(
    () => props.show,
    (show) => {
        if (show) {
            setBodyOverflow('hidden')
        } else {
            setBodyOverflow('')
        }
    },
    { immediate: true }
)

onBeforeUnmount(() => setBodyOverflow(''))
</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.55);
    z-index: 9999;
}

.modal-content {
    width: min(920px, 100%);
    max-width: 95vw;
    overflow-y: auto;
    background: var(--bg-color-900);
    border-radius: 10px;
    padding: 1.5rem;
    position: relative;
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.06);
    height: fit-content !important;
    max-height: 90dvh;
}

/* Vue Transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;

    .modal-content {
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;

    .modal-content {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
    }
}

.modal-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    border: none;
    background: transparent;
    color: var(--text-color);
    font-size: 1.75rem;
    cursor: pointer;
    z-index: 10;
}

.modal-header {
    margin-bottom: 1rem;
}

.project-description {
    margin: 1rem auto;
    line-height: 1.6;
    max-width: 80ch;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tag {
    display: inline-flex;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    background: var(--bg-color-500);
    color: var(--text-color-2);
    font-size: 0.85rem;
}

.project-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
    justify-content: space-between;
}

.modal-image {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.modal-image img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 16 / 9;
}

@media screen and (max-width: 600px) {
    .modal {
        align-items: flex-start;
        padding: 1.5rem 0.75rem;
    }

    .modal-content {
        width: 100vw;
        height: calc(100vh - 3rem);
        max-height: calc(100vh - 3rem);
        border-radius: 5px;
        padding: 1rem;
        box-sizing: border-box;
    }

    .modal-close {
        font-size: 1.5rem;
        top: 0.75rem;
        right: 0.75rem;
    }
}
</style>
