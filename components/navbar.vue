<template>
    <nav class="navbar" :class="navbarClass">
        <div class="wrapper">
            <div class="logo">
                &lt; /&gt; jrgenweb
            </div>
            <a href="#" class="menu" :class="isActive ? 'active' : ''" @click="toggleMenu($event)"><span
                    class="sr-only">Mobile
                    menu</span><span></span></a>
            <ul class="nav-links ">
                <li><a href="#">{{ $t('navbar.home') }}</a></li>
                <li><a href="#about">{{ $t('navbar.about') }}</a></li>
                <li><a href="#skills">{{ $t('navbar.skills') }}</a></li>
                <li><a href="#projects">{{ $t('navbar.projects') }}</a></li>
                <li><a href="#contact">{{ $t('navbar.contact') }}</a></li>
            </ul>
        </div>
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

</script>
<style lang="scss" scoped>
/* Alapállapot: a hero tetején áll */


/* Alaphelyzet – absolute pozícióval (hero részen) */
.navbar-absolute {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    transform: translateY(0);
}

/* Felfelé görgetéskor – fix + becsúszás */
.navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    //border-t majd csak akkor adjuk hozzá ha felfele görgetünk
    border-bottom: 1px solid rgba(255, 255, 255, 0.062);
}

/* Lefelé görgetéskor – eltűnik felfelé */
.navbar-hidden {
    transform: translateY(-100%);
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
}

.navbar {
    top: 0;
    left: 0;
    z-index: 10;

    width: 100%;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    backdrop-filter: blur(10px);
    padding-inline: 1rem;

    transition: 0.3s all;

    .wrapper {

        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;

        padding-inline: 20px;
    }

    ul {
        list-style: none;
        display: flex;
        gap: 20px;
        margin-inline-end: -20px;

        & li {


            a {
                background-color: var(--bg-color);

                color: var(---text-color-1);
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                transition: 0.3s all;

                & :active,
                & :focus {
                    border: 1px solid var(--bg-color-500);
                }

                &:hover {
                    background-color: var(--bg-color-500);
                    color: var(---text-color-1);
                    box-shadow: 0 0 10px rgba(50, 130, 184, 0.5);
                }
            }


        }
    }


}

.logo {

    padding-block: 0.5rem;

    color: var(--accent-color-3);
    font-weight: bold;
    font-size: 1.5rem;
    text-wrap: nowrap;
    cursor: default;


    & img {
        width: 100%;
        height: 100%;
        object-position: 10px -2px;

    }
}

@media screen and (max-width:760px) {

    .navbar {
        .wrapper {
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: auto auto;
            padding-inline: 0px;

            .logo {
                grid-column: 1/2;
                grid-row: 1/2;

            }

            .menu {
                grid-column: 2/3;
                grid-row: 1/2;
                display: flex;
                padding-block: 0.5rem;


                &.active {
                    &+ul {
                        display: flex;
                        animation: sideFromAbove 0.5s forwards;
                    }

                }
            }

            ul {
                grid-column: 1/3;
                grid-row: 2/3;
                flex-direction: column;
                padding: 2rem 1rem;
                padding-right: 5rem;
                font-size: 1.5rem;
                gap: 1.5rem;

                display: none;

            }
        }
    }




}

.menu {
    display: none;

}

.menu span:not(.sr-only) {
    width: 30px;
    height: 4px;
    border-radius: 3px;
    display: block;
    background-color: var(--bg-color-100);
    position: relative;
    transition: background-color 0.3s ease;


    &::before,
    &::after {
        content: '';
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        background-color: var(--bg-color-100);
        transition:
            top 0.3s ease,
            transform 0.3s ease,
            opacity 0.3s ease;
    }

    &::before {
        top: -10px;
    }

    &::after {
        top: 10px;
    }
}

/* === ACTIVE állapot - animált átalakulás X-é === */
.menu.active span:not(.sr-only) {
    background-color: transparent; // középső vonal eltűnik
}

.menu.active span:not(.sr-only)::before {
    top: 0;
    transform: rotate(45deg) scaleX(0.8);
}

.menu.active span:not(.sr-only)::after {
    top: 0;
    transform: rotate(-45deg) scaleX(0.8);
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