<template>
    <div class="card" >
        <div class="card-image" @click="open">
            <NuxtImg :src="data.imgurl" :alt="data.title + ' projekt képe'" format="webp" width="600" height="600" />
        </div>
        <Transition name="fade" mode="out-in">
            <div :key="$i18n.locale" class="card-body">
                <h3 @click="open">{{ data.title }}</h3>
                <div class="description-wrapper">
                    <p class="description">{{ shortDescription }}</p>
                </div>
                <div class="card-tags">                    
                    <app-badge v-for="tag in data.tags" :key="tag.id" variant="default" mode="outline">
                        
                        <img :src="'/'+ICON_PATH+'/'+tag.icon" class="w-5 aspect-square block">

                        <span>
                            {{ tag.title }}
                        </span>
                        </app-badge>                    
                </div>
                <div class="card-links" @click.stop>
                    <app-button v-if="data.github" type="link" 
                    variant="outline" size="sm"   :href="data.github" target="_blank">
                        Github
                    </app-button>
                    <app-button v-if="data.liveurl" type="link" size="sm" variant="secondary" :href="data.liveurl" target="_blank">
                        Live
                    </app-button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PortfolioProject } from '~/types/project';
const config = useRuntimeConfig();
const ICON_PATH = config.public.ICON_PATH;


const props = defineProps<{ data: PortfolioProject }>()
const emit = defineEmits<{ (e: 'open', project: PortfolioProject): void }>()

const open = () => emit('open', props.data)

const shortDescription = computed(() => {
    const text = props.data.description.replace(/<[^>]+>/g, '')
    const max = 80
    if (text.length <= max) return text
    return text.slice(0, max).trimEnd() + '…'
})
</script>

<style scoped>
@reference "@/assets/css/main.css";

.card {
    @apply bg-bg-900 p-4 rounded-[10px] flex flex-col
           shadow-[0_0_10px_rgba(0,0,0,0.1)]
           transition-transform duration-300 ease-in-out
           hover:-translate-y-[5px] ;

    .card-image {
        @apply relative rounded-[inherit] overflow-hidden cursor-pointer;

        img {
            @apply rounded-[10px] h-[200px] w-full object-cover object-center
                   transition-all duration-300 ease-in-out
                   hover:sepia-[0.1];
        }

        &:hover img {
            @apply scale-105 cursor-pointer;
        }
    }

    .card-body {
        @apply flex flex-col flex-grow;

        h3 {
            @apply my-2 font-bold transition-all duration-300 ease-in-out cursor-pointer
                   hover:text-accent-2 cursor-pointer;

            &::before {
                @apply content-[''] block w-[50px] h-[2px] bg-accent-1 mb-2;
            }
        }

        p {
            @apply text-left text-base max-w-[80ch];
            font-family: Inter, sans-serif;
        }

        .card-tags {
            @apply flex flex-nowrap overflow-x-scroll overflow-y-hidden
                   gap-2 py-2 mt-auto;
        }

       

        .card-links {
            @apply flex justify-between pt-4 mt-auto;
        }
    }
}
</style>