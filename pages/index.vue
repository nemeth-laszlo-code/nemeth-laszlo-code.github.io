<template>
    <div>

        <NuxtPage />


        <main class="container">
            <scrolltotop></scrolltotop>
            <div class="nav-switch">
                <lang-switch></lang-switch>
                <theme-switch :disabled="false"></theme-switch>
            </div>
            <navbar></navbar>
            <header-component></header-component>
            <div class="flex">

                <orbit id="skills"></orbit>
                <panel id="about">
                    <h2>{{ $t('content.h2') }}</h2>
                    <p>{{ $t('content.p1') }}</p>
                    <p>{{ $t('content.p2') }}</p>
                    <p>{{ $t('content.p3') }}</p>
                </panel>


            </div>
            <panel id="projects">
                <h2>{{ $t('projects.h2') }}</h2>
                <p>{{ $t('projects.p') }}</p>
                <projects></projects>
            </panel>
            <contact id="contact" </contact>
                <footer>
                    <p> 2025@jrgen.hu
                    </p>
                    <p>
                        {{ $t('footer') }}
                    </p>
                </footer>
        </main>

    </div>
</template>

<script setup>
const { locale } = useI18n();




useHead({
    htmlAttrs: {
        lang: locale.value
    }
})

onMounted(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const saved = localStorage.getItem('theme') || systemTheme
    document.documentElement.setAttribute('data-theme', saved)
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

#about {
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

#projects {
    h2 {
        margin-bottom: 1rem;
    }
}
</style>