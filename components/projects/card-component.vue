<template>
    <div class="card">
        <div class="card-image">
            <NuxtImg :src="data.imgurl" :alt="data.title + ' projekt képe'" format="webp" width="600" height="600" />
        </div>

        <h3>{{ data.title }}</h3>

        <div class="description-wrapper">
            <p v-html="data.description" class="description"></p>
        </div>

        <div class="card-tags">
            <span class="card-tag" v-for="tag in data.tags">
                {{ tag }}
            </span>

        </div>
        <div class="card-links">
            <button-component v-if="data.github" type="link" className="secondary sm" :href="data.github"
                target="_blank">
                Github
            </button-component>
            <button-component v-if="data.liveurl" type="link" className="secondary sm" :href="data.liveurl"
                target="_blank">
                Live
            </button-component>
        </div>
    </div>
</template>

<script setup lang="ts">
interface PortfolioProject {
    title: string
    description: string
    imgurl: string
    github: string
    liveurl: string,
    tags: string[]
}

const props = defineProps<{ data: PortfolioProject }>()
</script>

<style lang="scss" scoped>
.card {
    background-color: var(--bg-color-900);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;

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
            transition: 0.3s all ease-in-out;

            &:hover {
                filter: sepia(0.1);
            }
        }

        &:hover {
            img {
                scale: 1.05;
                cursor: pointer;
            }
        }
    }

    &:hover {
        transform: translateY(-5px);
    }

    h3 {
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
            color: var(--accent-color-2);
        }
    }

    p {
        text-align: left;
        font-size: 1rem;
        font-family: Inter;
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
        padding-top: 1rem;
        margin-top: auto;
    }


}
</style>