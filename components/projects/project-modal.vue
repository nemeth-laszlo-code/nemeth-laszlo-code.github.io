<template>
    <teleport to="body">
        <div v-if="show" class="modal" @click.self="close">
            <div class="modal-content" role="dialog" aria-modal="true" aria-label="Projekt részletei">
                <button class="modal-close" type="button" @click="close" aria-label="Bezárás">×</button>

                <div class="modal-header">
                    <h2>{{ project?.title }}</h2>
                </div>

                <div class="modal-body">
                    <div class="modal-image">
                        <NuxtImg v-if="project?.imgurl" :src="project.imgurl" :alt="project.title + ' projekt képe'"
                            format="webp" width="800" height="450" />
                    </div>
                    <p v-html="project?.description" class="project-description"></p>

                    <div v-if="project?.tags?.length" class="project-tags">
                        <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                    </div>

                    <div class="project-actions">
                        <button-component v-if="project?.github" type="link" className="secondary"
                            :href="project.github" target="_blank">
                            Github
                        </button-component>

                        <button-component v-if="project?.liveurl" type="link" className="secondary"
                            :href="project.liveurl" target="_blank">
                            Live
                        </button-component>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, onBeforeUnmount } from 'vue'

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

const close = () => emit('close')

// Ne engedjük a body görgetését, amikor fent a modal
const setBodyOverflow = (value: string) => {
    if (process.client) document.body.style.overflow = value
}

watch(
    () => props.show,
    (show) => {
        setBodyOverflow(show ? 'hidden' : '')
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
    max-height: 90vh;
    overflow-y: auto;
    background: var(--bg-color-900);
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.06);
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

@media screen and (max-width: 600px) {
    .modal {
        align-items: flex-start;
        padding: 1.5rem 0.75rem;
    }

    .modal-content {
        width: 100vw;
        height: calc(100vh - 3rem);
        max-height: calc(100vh - 3rem);
        border-radius: 0;
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
