<template>
            
    <main class="container max-w-[1200px] mx-auto mt-[60px] p-2 md:p-4 xl:px-0 overflow-hidden ">
            <navbar></navbar>
            <div class="nav-switch flex items-center justify-end gap-8">
                <app-switch :checked="isEn" @change="toggleLang">
                    {{ locale.value }}
                    <template #option2>HU</template>
                    <template #option>EN</template>
                </app-switch>
                <app-switch class="md:block hidden" :checked="isDark" @change="toggleTheme">
                    <template #option>
                        <app-icon-sun />
                    </template>
                    <template #option2>
                        <app-icon-moon />
                    </template>
                </app-switch>

            </div>

            <header-component class="mt-4 lg:mt-8 "></header-component>

            <!-- orbit and intrudaction section -->
            <section class="flex flex-wrap md:flex-nowrap items-center md:flex-row gap-4 xl:gap-8 mt-4 xl:mt-8 justify-center">

                <orbit id="skills"></orbit>
                <Transition name="fade" mode="out-in" appear>
                    <app-panel id="about" :key="$i18n.locale" class="flex flex-col gap-4">
                        <h2 class="text-h2 uppercase">{{ $t('content.h2') }}</h2>
                        <p class="text-body-2">{{ $t('content.p1') }}</p>
                        <p class="text-body-2">{{ $t('content.p2') }}</p>
                        <p class="text-body-2">{{ $t('content.p3') }}</p>
                    </app-panel>
                </Transition>


            </section>
            <projects class="mt-4 xl:mt-8 block"></projects>
            
            <contact id="contact" class="mt-4 xl:mt-8"></contact>
            <Transition name="fade" mode="out-in" appear>
                <footer :key="$i18n.locale" class="mt-12 text-center py-2">
                    <p class="text-center"> {{ currentYear }}@<a href="#" class="transition-colors duration-300 hover:text-accent-2">nemeth-laszlo-code.github.io</a>
                    </p>
                    <p class="text-center my-2 ">
                        {{ $t('footer') }}
                    </p>
                </footer>
            </Transition>

        </main>
        <scrolltotop></scrolltotop>
        <ClientOnly>
            <cookie-consent></cookie-consent>
        </ClientOnly>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { locale, setLocale } = useI18n();
const currentYear = ref(new Date().getFullYear());
const isDark = ref(false);
const isEn = ref(false);

useHead({
    htmlAttrs: {
        lang: isEn.value ? 'en' : 'hu'
    }
})

onMounted(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const saved = localStorage.getItem('theme') || systemTheme
    document.documentElement.setAttribute('data-theme', saved)
    isEn.value = locale.value === 'en' ? true : false;
    const theme = localStorage.getItem('theme') || 'light';
    isDark.value = theme === 'dark';

})

const toggleLang = () => {
    isEn.value = !isEn.value;
    setLocale(isEn.value ? 'en' : 'hu');
}

function toggleTheme() {

    isDark.value = !isDark.value
    const current = document.documentElement.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
}



</script>

<style scoped>
@reference "@/assets/css/main.css";




</style>