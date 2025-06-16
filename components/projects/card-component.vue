<template>
    <div class="card">
        <div class="card-image">
            <NuxtImg :src="data.img_url" :alt="data.title + 'Projekt képe'" format="webp" width="600" height="600">
            </NuxtImg>
        </div>
        <h3>{{ data.title }}</h3>
        <p>{{ data.description }}</p>
        <div class="card-tags">
            <span class="card-tag" v-for="tag in data.tags">
                {{ tag }}
            </span>

        </div>
        <div class="card-links">
            <button-component type="link" className="secondary sm" :href="data.github_url"
                target="_blank">Github</button-component>
            <button-component type="link" className="secondary sm" :href="data.live_url"
                target="_blank">live</button-component>

        </div>
    </div>
</template>
<script setup lang="ts">
import type { Project } from '@/types/project'
const props = defineProps<{ data: Project }>()
</script>

<style lang="scss" scoped>
.card {
    background-color: var(--bg-color-900);
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border-radius: 10px;


    display: flex;
    flex-direction: column;

    cursor: pointer;

    &-image {


        position: relative;
        border-radius: inherit;
        overflow: hidden;

        img {
            border-radius: 10px;
            height: 200px;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            object-position: center;
            // filter: sepia(0.3);
            transition: 0.3s all ease-in-out;

            &:hover {
                filter: sepia(0.1);
            }
        }

        &:hover {
            img {
                scale: 1.05;
            }

            &::before {
                scale: 0;
                opacity: 0.9;
            }
        }

        &::before {
            content: '';
            background-color: var(--accent-color-3);
            opacity: 0.3;
            position: absolute;
            border-radius: 50%;
            aspect-ratio: 1;
            inset: -10%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
            transition: .5s ease;
        }
    }

    &:hover {
        transform: translateY(-5px);
    }

    h3 {
        margin-top: 0;
        margin-block: 0.5rem;
        transition: 0.3s all ease-in-out;

        &::before {
            content: "";
            display: block;
            width: 50px;
            height: 2px;
            background-color: var(--accent-color-1);
            margin-bottom: 0.5rem;
        }

        &:hover {
            color: var(--accent-color-1)
        }
    }

    p {
        text-align: justify;
    }



    &-tags {

        padding-block: 0.5rem;
        display: flex;
        flex-wrap: wrap;

        gap: 0.5rem;
        margin-top: auto;


    }

    &-tag {
        display: inline-block;
        background-color: var(--bg-color-500);
        color: var(--text-color-2);
        border-radius: 5px;
        padding: 0.2rem 0.5rem;

    }

    &-links {
        display: flex;
        justify-content: space-between;
        padding-top: 1rem
    }
}
</style>