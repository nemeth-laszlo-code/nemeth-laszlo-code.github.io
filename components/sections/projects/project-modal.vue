<template>
  <teleport to="body">
    <Transition name="modal">
      <div 
        v-if="show" 
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 md:p-0"
        @click.self="emit('close')"
      >
        <div 
          class="modal-content relative h-fit max-h-[90dvh] w-full max-w-[920px]! overflow-y-auto rounded-xl border border-white/10 bg-bg-900 p-6 shadow-2xl transition-all duration-300 sm:max-w-[95vw]"
          role="dialog" 
          aria-modal="true" 
          aria-label="Projekt részletei"
        >
          <button 
            class="absolute top-4 right-4 z-10 cursor-pointer border-none bg-transparent text-3xl leading-none text-text-1 transition-transform hover:scale-110" 
            type="button" 
            @click="emit('close')" 
            aria-label="Bezárás"
          >
            ×
          </button>

          <div class="mb-4">
            <h2 class="text-h2 font-bold text-text-1">{{ activeProject?.title }}</h2>
          </div>

          <div class="space-y-4">
            <div class="flex justify-center overflow-hidden rounded-lg">
              <NuxtImg 
                v-if="activeProject?.imgurl" 
                :src="activeProject.imgurl"
                :alt="activeProject.title + ' projekt képe'" 
                format="webp" 
                width="800" 
                height="450" 
                class="aspect-video w-full object-cover"
              />
            </div>

            <p 
              v-html="activeProject?.description" 
              class="max-w-[80ch] leading-relaxed text-text-1/80"
            ></p>

            <div v-if="activeProject?.tags?.length" class="flex flex-wrap gap-2">
                <app-badge v-for="tag in activeProject.tags" 
                :key="tag.id" >{{ tag }}</app-badge>             
            </div>

            <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
              <app-button 
                v-if="activeProject?.github" 
                type="link" 
                className="secondary"
                :href="activeProject.github" 
                target="_blank"
              >
                Github
              </app-button>

              <app-button 
                v-if="activeProject?.liveurl" 
                type="link" 
                className="secondary"
                :href="activeProject.liveurl" 
                target="_blank"
              >
                Live
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>




<script setup lang="ts">import { watch, onBeforeUnmount, onMounted, ref } from 'vue'
import type { PortfolioProject } from '~/types/project';



const props = defineProps<{
    show: boolean
    project: PortfolioProject | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

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

// 🔒 body scroll lock
const setBodyOverflow = (value: string) => {
    if (process.client) document.body.style.overflow = value
}

watch(
    () => props.show,
    (show) => {
        if (show) {
            setBodyOverflow('hidden')

            // 👉 push state amikor megnyílik
            if (!history.state?.modal) {
                history.pushState({ modal: true }, '')
            }
        } else {
            setBodyOverflow('')
        }
    },
    { immediate: true }
)


// 🔥 BACK GOMB KEZELÉS
const onPopState = () => {
    if (props.show) {
        emit('close')
    }
}

onMounted(() => {
    window.addEventListener('popstate', onPopState)
})

onBeforeUnmount(() => {
    window.removeEventListener('popstate', onPopState)
    setBodyOverflow('')
})
</script>


<style scoped>
@reference "@/assets/css/main.css";

/* Vue Transition - TW4 kompatibilis nestinggel */
.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-300 ease-out;

  .modal-content {
    @apply transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)];
  }
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;

  .modal-content {
    @apply translate-y-4 scale-95 opacity-0;
  }
}

/* Mobilos finomhangolás, amit utility-vel nehéz lenne */
@media screen and (max-width: 600px) {
  .modal-content {
    
    max-height: calc(100dvh - 2rem);
  }
}
</style>
