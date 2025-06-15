<template>
    <nav class="navbar" :class="navbarClass">
        <div class="wrapper">
            <div class="logo">
                &lt; /&gt; jrgenweb
            </div>
            <a href="#" class="menu"><span class="sr-only">Mobile menu</span><span></span></a>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Rólam</a></li>
                <li><a href="#">Skillek</a></li>
                <li><a href="#">Projektjeim</a></li>
                <li><a href="#">Kapcsolat</a></li>
            </ul>
        </div>
    </nav>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isFixed = ref(false)
const isAtTop = ref(true)
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
        // Lefelé görgetés vagy tetején vagyunk: ne legyen fixed
        isFixed.value = false
    }

    lastScroll = currentScroll
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
    }

    ul {
        list-style: none;
        display: flex;
        gap: 20px;

        & li {


            a {
                background-color: var(--bg-color);

                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                transition: 0.3s all;

                & :active,
                & :focus {
                    border: 1px solid #3282b8;
                }

                &:hover {
                    background-color: #3282b8;
                    color: white;
                    box-shadow: 0 0 10px rgba(50, 130, 184, 0.5);
                }
            }


        }
    }


}

.logo {

    padding-block: 0.5rem;

    color: #81d94d;
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

//hamburger ,emu létrehozása css-el
.menu {
    display: none;
    width: 30px;


    justify-content: center;
    align-items: center;
    padding-block: 10px;


    span:not(.sr-only) {
        width: 30px;
        height: 4px;
        border-radius: 3px;
        display: block;
        background-color: white;
        position: relative;


        &::before,
        &::after {
            content: '';
            position: absolute;
            width: inherit;
            height: inherit;
            border-radius: inherit;
            background-color: inherit;

        }

        &::before {
            top: -10px;

        }

        &::after {
            top: 10px;
        }
    }
}


@media screen and (max-width:760px) {
    .menu {
        display: flex;
    }

    .navbar {
        ul {
            display: none;
        }

        ul.active {
            background-color: red;
            display: block;
            position: absolute;
            width: 50%;
            top: 0;
            left: 0;
            padding: 2rem 1rem;
            font-size: 1.5rem;
            gap: 1rem;
        }
    }
}
</style>