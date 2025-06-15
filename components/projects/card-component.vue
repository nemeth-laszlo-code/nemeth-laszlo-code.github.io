<template>
    <div class="card">
        <div class="card-image">

            <NuxtImg :src="data.img_url" :alt="data.title_hu + 'Projekt képe'" format="webp" width="600" height="600">
            </NuxtImg>

        </div>
        <h3>{{ data.title_hu }}</h3>
        <p>{{ data.description_hu }}</p>
    </div>
</template>
<script setup lang="ts">
import type { Project } from '@/types/project'

const props = defineProps<{ data: Project }>()



</script>

<style lang="scss">
.card {
    background-color: var(--bg-color-900);
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border-radius: 10px;
    cursor: pointer;

    &-image {


        position: relative;
        border-radius: inherit;
        overflow: hidden;

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
            background-color: #81d94d;
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
            background-color: var(--color-1);
            margin-bottom: 0.5rem;
        }

        &:hover {
            color: var(--color-1)
        }
    }

    p {
        text-align: justify;
    }

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
}
</style>