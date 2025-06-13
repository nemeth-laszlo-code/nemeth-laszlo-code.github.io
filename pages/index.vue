<template>
    <div>


        <main class="container">
            <div>Dark mode
                Lang választás
            </div>
            <navbar :class="navbarClass"></navbar>
            <header-component></header-component>
            <div style="display: flex; gap:2rem">
                <panel>
                    <h2>Üdv az oldalamon</h2>
                    <p>Mindig is érdekelt a programozás és a digitális világ működése. Körülbelül két éve kezdtem el

                        komolyabban foglalkozni a fejlesztéssel, azóta aktívan tanulok, gyakorlok és kisebb projekteket
                        valósítok meg.</p>
                    <p>
                        Tudatosan a frontend fejlesztés mellett döntöttem, mert vonz a vizuális megjelenítés, a
                        felhasználói élmény tervezése, és az, hogy amit készítek, az azonnal „kézzelfogható”. Jelenleg
                        Angular-ral dolgozom, emellett folyamatosan mélyítem a tudásom JavaScript, HTML, CSS, és
                        webalkalmazás-fejlesztés terén.
                    </p>
                    <p>
                        Célom, hogy letisztult, reszponzív és jól működő felületeket hozzak létre, miközben folyamatosan
                        fejlődöm a szakmában. Szívesen tanulok új technológiákat, és örömmel vállalok kihívásokat, akár
                        csapatban, akár önállóan dolgozva.
                    </p>
                </panel>

                <orbit></orbit>

            </div>
            <panel>
                <h2>Projektjeim</h2>
                <p></p>
                <p>Az alábbiakban néhány projektet mutatok be, amelyeken dolgoztam. Ezek a projektek tükrözik a
                    frontend fejlesztés iránti szenvedélyemet és kreativitásomat.</p>

                <div class="projects">
                    <div class="card">
                        <div class="card-image">
                            <img src="https://jrgenweb.github.io/assets/img/projects/frontend_mentor/result-summary-component.webp"
                                alt="">
                        </div>
                        <h3>Projekt 1</h3>
                        <p>Ez egy rövid leírás a projektről. Itt bemutathatod a projekt célját és technológiáit.</p>
                    </div>
                    <div class="card">
                        <img src="https://github.com/jrgenweb/frontend-quiz-app/blob/master/preview.jpg?raw=true"
                            alt="">
                        <h3>Frontend quiz app</h3>
                        <p>Ez egy rövid leírás a projektről. Itt bemutathatod a projekt célját és technológiáit.</p>
                    </div>
                    <div class="card">
                        <img src="https://github.com/jrgenweb/hangman-game/blob/master/preview.jpg?raw=true" alt="">
                        <h3>Hangman game</h3>
                        <p>Ez egy rövid leírás a projektről. Itt bemutathatod a projekt célját és technológiáit.</p>
                    </div>
                    <div class="card">

                        <h3>Projekt 1</h3>
                        <p>Ez egy rövid leírás a projektről. Itt bemutathatod a projekt célját és technológiáit.</p>
                    </div>
                    <div class="card">

                        <h3>Projekt 1</h3>
                        <p>Ez egy rövid leírás a projektről. Itt bemutathatod a projekt célját és technológiáit.</p>
                    </div>
                </div>
            </panel>
            <contact></contact>
            <footer> 2025@Németh László</footer>
        </main>

    </div>
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

<style lang="scss">
p {
    text-align: justify;
    line-height: 1.6;
    color: var(--text-color);
}

.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;

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
}
</style>