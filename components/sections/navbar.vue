<template>
    <nav class="navbar" :class="navbarClass">
        <div class="wrapper" :class="{ open: isActive }">
            <a href="#" class="logo">
                &lt;NL /&gt;
            </a>
            <button class="menu" aria-controls="primary-navigation" :aria-expanded="isActive.toString()"
                :class="isActive ? 'active' : ''" @click="toggleMenu($event)"><span class="sr-only">Mobile menu</span>
                <svg fill="currentColor" class="hamburger" viewBox="0 0 100 100" width="40">
                    <rect class="line top" width="80" height="10" x="10" y="25" rx="5">
                    </rect>
                    <rect class="line middle" width="80" height="10" x="10" y="45" rx="5">
                    </rect>
                    <rect class="line bottom" width="80" height="10" x="10" y="65" rx="5">
                    </rect>
                </svg>
            </button>
            <Transition name="fade" mode="out-in">
                
                <ul class="nav-links " :key="$i18n.locale">
                    <li><a href="#" class="nav-link-item">{{ $t('navbar.home') }}</a></li>
                    <li><a href="#about" class="nav-link-item">{{ $t('navbar.about') }}</a></li>
                    <li><a href="#skills" class="nav-link-item">{{ $t('navbar.skills') }}</a></li>
                    <li><a href="#projects" class="nav-link-item">{{ $t('navbar.projects') }}</a></li>
                    <li><a href="#contact" class="nav-link-item">{{ $t('navbar.contact') }}</a></li>
                </ul>
            </Transition>

        </div>
        <div class="backdrop" v-if="isActive" @click="toggleMenu($event)"></div>
    </nav>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isFixed = ref(false)
const isAtTop = ref(true)
const isActive = ref(false)
let lastScroll = 0

// Dinamikus osztály: fixed vagy absolute, vagy egyik sem
const navbarClass = computed(() => {
    if (isAtTop.value) return 'navbar-absolute'
    if (isFixed.value) return 'navbar-fixed'
    return 'navbar-hidden' // lefelé görgetéskor semmi
})

const handleScroll = () => {
    const currentScroll = window.scrollY

    isAtTop.value = currentScroll === 0

    if (currentScroll < lastScroll && !isAtTop.value) {
        // Felfelé görgetés és nem a tetején: legyen fixed
        isFixed.value = true
    } else {
        // Lefelé görgetés vagy tetején vagyunk: ne legyen fixed, false-re állítjuk 
        isFixed.value = false
        isActive.value = false;
    }

    lastScroll = currentScroll

}
function toggleMenu(event) {
    event.preventDefault();

    isActive.value = !isActive.value
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
function scrollTo(hash) {
    if (hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }
    const el = document.querySelector(hash)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
<style scoped>
@reference "@/assets/css/main.css";

.navbar-absolute {
    @apply absolute top-0 left-0 w-full opacity-100 translate-y-0;
}

.navbar-fixed {
    @apply fixed top-0 left-0 w-full translate-y-0 opacity-100 border-b border-white/10;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.navbar-hidden {
    @apply fixed top-0 left-0 w-full -translate-y-full opacity-0 invisible pointer-events-none;
}

.navbar-fixed,
.navbar-absolute {
    @apply visible pointer-events-auto;
}







.navbar {
    @apply top-0 left-0 z-50 w-full backdrop-blur-md transition-all duration-300 ;


    & .wrapper {
        @apply flex justify-between items-center max-w-[1200px] mx-auto  py-2 flex-wrap overflow-hidden transition-all duration-300 relative
        px-2 md:px-4 xl:px-0 ;
        max-height: 60px;

        &::after {
            @apply hidden;
        }

        &.open {
            @apply h-auto max-h-[500px];

            .nav-links {
                @apply opacity-100;
            }
        }


    }


}



.navbar .backdrop {
    content: '';
    @apply -mx-4 min-h-dvh w-dvw -z-10 opacity-0 pointer-events-none transition-opacity duration-300;
    background: rgba(0, 0, 0, 0.267);
    backdrop-filter: blur(4px);
}

.navbar:has(.wrapper.open) {


    .backdrop {
        @apply opacity-100 pointer-events-auto;
    }
}

.logo {
    @apply md:py-2 text-accent-3 font-bold text-2xl md:whitespace-nowrap  col-start-1 col-end-2 row-start-1 row-end-2 cursor-pointer!;
}

.nav-links {
    @apply list-none flex md:flex flex-col md:flex-row md:gap-3 gap-2 w-full md:w-auto
    /* ← mobilon teljes szélesség */
    px-0 mt-4 md:mt-0 py-2 md:py-0 md:px-0 text-xl overflow-hidden opacity-0 md:opacity-100 transition-all duration-300;



}

.nav-link-item {

    @apply bg-transparent inline-block text-text-1 px-3 py-1.5 no-underline rounded-md transition-all duration-300 border border-transparent outline-0 text-body-2;


}

.nav-link-item:active,
.nav-link-item:focus {
    @apply border border-bg-500;
}

.nav-link-item:hover {

    @apply bg-bg-500 rounded-md text-text-1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

}

.navbar :deep(.nav-link-item:focus),
.navbar :deep(.nav-link-item:active) {
    @apply border border-bg-500 rounded-md;
}

.logo {
    @apply text-accent-3 font-bold text-2xl whitespace-nowrap cursor-default;

}

.menu {
    --button-color: var(--text-color-1);
    --delay: 0.1s;
    --duration: 0.1s;
    @apply border-0 outline-0 w-10 aspect-square cursor-pointer bg-transparent md:hidden z-50 relative  flex items-center justify-end;


    /* grid osztályok TÖRÖLD */
}



.menu .line {
    @apply transition-all duration-(--duration) ease-in origin-center;
    transition-delay: var(--delay), 0ms, var(--delay);
}

.menu[aria-expanded="true"] .line {
    @apply transition-all duration-(--duration) ease-in;
    transition-delay: 0ms, var(--delay), var(--delay);
}

.menu[aria-expanded="true"] :is(.top, .bottom) {
    y: 45;
}

.menu[aria-expanded="true"] .top {
    rotate: 45deg;
}

.menu[aria-expanded="true"] .middle {
    @apply opacity-0;
}

.menu[aria-expanded="true"] .bottom {
    rotate: -45deg;
}

@keyframes sideFromAbove {
    from {
        display: flex;
        opacity: 0.6;
        transform: translateY(-100px);
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>