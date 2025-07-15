<template>
    <div>
        <div class="scrolltotop" :class="showScrollTop ? 'active' : ''">
            <a href="#">
                <span class="sr-only">Scroll to Top</span>
                <svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32"
                    width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path
                        d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                        fill="#515151" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showScrollTop = ref(false)
let lastScroll = 0

const SCROLL_THRESHOLD = 300 // hány pixel után jelenjen meg a gomb

const handleScroll = () => {
    const currentScroll = window.scrollY

    if (currentScroll > SCROLL_THRESHOLD && currentScroll > lastScroll) {
        // Görgetünk lefelé és túlléptük a küszöböt → gomb megjelenik
        showScrollTop.value = true
    } else if (currentScroll <= SCROLL_THRESHOLD || currentScroll === 0) {
        // Túl közel vagyunk a tetejéhez → gomb eltűnik
        showScrollTop.value = false
    }

    lastScroll = currentScroll
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.scrolltotop {
    visibility: hidden;
    opacity: 0;
    border-radius: 50%;
    position: fixed;
    z-index: 1000;
    bottom: 10px;
    right: 10px;
    padding: 0.75rem;
    backdrop-filter: blur(10px);



    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.062);

    transition: 0.3s all;
}

.scrolltotop.active {
    visibility: visible;
    opacity: 1;
}

svg path {
    fill: var(--text-color-1);
}
</style>