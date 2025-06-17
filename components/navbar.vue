<template>
    <nav class="navbar" :class="navbarClass">
        <div class="wrapper">
            <div class="logo">
                &lt; /&gt; jrgenweb
            </div>
            <!--<a href="#" class="menu" :class="isActive ? 'active' : ''" @click="toggleMenu($event)">

                <span class="sr-only">Mobile menu</span>
                <div class="icon">
                    <span></span>
                </div>
            </a>-->

            <button class="menu" aria-controls="primary-navigation" :aria-expanded="isActive.toString()"
                :class="isActive ? 'active' : ''" @click="toggleMenu($event)"><span class="sr-only">Mobile menu</span>
                <svg fill="var(--button-color)" class="hamburger" viewBox="0 0 100 100" width="250">
                    <rect class="line top" width="80" height="10" x="10" y="25" rx="5">
                    </rect>
                    <rect class="line middle" width="80" height="10" x="10" y="45" rx="5">
                    </rect>
                    <rect class="line bottom" width="80" height="10" x="10" y="65" rx="5">
                    </rect>
                </svg>
            </button>
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

                display: block;

                &.active {



                    &+ul {
                        display: flex;
                        animation: sideFromAbove 0.5s forwards;
                        max-width: 100%;
                        left: 0;
                    }

                }
            }

            ul {
                grid-column: 1/3;
                grid-row: 2/3;
                flex-direction: column;
                padding: 2rem 1rem;
                //padding-right: 5rem;
                font-size: 1.5rem;
                gap: 1.5rem;

                display: none;

            }
        }
    }




}

.menu {
    --button-color: var(---text-color-1);
    --delay: 0.1s;
    --duration: 0.1s;
    border: 0;
    outline: 0;

    width: 35px;
    cursor: pointer;
    display: none;
    -webkit-tap-highlight-color: transparent;
    /* iOS és Android Chrome */
    tap-highlight-color: transparent;
    /* egyes böngészők */
}

.menu .line {
    transition: y var(--duration) ease-in var(--delay),
        rotate var(--duration) ease-in, opacity 0ms var(--delay);
    transform-origin: center;
}

.menu[aria-expanded="true"] .line {
    transition:
        y var(--duration) ease-in,
        rotate var(--duration) ease-in var(--delay),
        opacity 0ms var(--delay);
}

.menu[aria-expanded="true"] :is(.top, .bottom) {
    y: 45;
}

.menu[aria-expanded="true"] .top {
    rotate: 45deg;
}

.menu[aria-expanded="true"] .middle {
    opacity: 0;
}

.menu[aria-expanded="true"] .bottom {
    rotate: -45deg;
}


@keyframes translateToMiddle {
    to {
        top: 50%;
        transform: translateY(-50%);
    }
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