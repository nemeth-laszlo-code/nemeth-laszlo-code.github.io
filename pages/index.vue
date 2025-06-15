<template>
    <div>

        <NuxtPage />
        <main class="container">
            <div class="nav-switch">
                <lang-select></lang-select>
                <theme-select></theme-select>
            </div>
            <navbar></navbar>
            <header-component></header-component>
            <div class="flex">

                <orbit></orbit>
                <panel style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem;">
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


            </div>
            <panel>
                <h2>Projektjeim</h2>
                <p></p>
                <p>Az alábbiakban néhány projektet mutatok be, amelyeken dolgoztam. Ezek a projektek tükrözik a
                    frontend fejlesztés iránti szenvedélyemet és kreativitásomat.</p>
                <projects></projects>
            </panel>
            <contact></contact>
            <footer>
                <p> 2025@jrgenweb.github.io
                </p>
                <p>
                    Németh László Frontend Fejlesztő
                </p>


            </footer>
        </main>

    </div>
</template>

<script setup>
const { locale } = useI18n()

useHead({
    htmlAttrs: {
        lang: locale.value
    }
})
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    flex-wrap: nowrap;
    gap: 2rem;
    align-items: center;
}

@media screen and (max-width:870px) {
    .flex {

        flex-wrap: wrap;
        flex-direction: column-reverse;
        justify-content: center;
    }
}

p {
    text-align: justify;
    line-height: 1.6;
    color: var(--text-color);
}




.nav-switch {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;


}

footer {
    margin-top: 3rem;

    p {
        text-align: center;
    }

}
</style>