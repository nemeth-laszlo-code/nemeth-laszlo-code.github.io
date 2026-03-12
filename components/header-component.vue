<template>
    <panel>
        <header class="header">
            <div class="header-content">
                <p>{{ $t('header.p') }}</p>
                <h1>{{ $t('header.h1') }}</h1>
                <h2>{{ $t('header.h3') }}</h2>
            </div>
            <div class="header-social flex">
                <social-links></social-links>
                <button-component className="secondary" type="link" :href="cv_url" target="_blank">{{ $t('header.cv')
                    }}</button-component>
            </div>
            <div class="header-image">
                <div class="image">
                    <NuxtImg src="/images/profile.jpg" format="webp" width="300" height="300" loading="eager"
                        alt="Németh László profil kép"></NuxtImg>
                </div>
            </div>
        </header>
    </panel>
</template>
<script setup>
const { locale } = useI18n();

// A nyelv változtatásakor frissülő link
const cv_url = computed(() =>
    locale.value === 'hu'
        ? '/CV/nemeth_laszlo_frontend_fejleszto_cv.pdf'
        : '/CV/nemeth_laszlo_frontend_developer_cv.pdf'
);

</script>
<style lang="scss" scoped>
.header {
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, autofit));
    grid-template-rows: 1fr 1fr;

    .header-content {
        padding: 1rem;
        grid-column: 1/2;
        grid-row: 1/2;

        margin-block-end: -1rem;

        >* {
            transform: translateY(30px);
        }


    }

    .header-social {
        grid-column: 1/2;
        grid-row: 2/3;
        align-self: flex-end;
        justify-self: flex-start;
        padding-left: 1rem;
        padding-bottom: 1.5rem;


    }

    .header-image {
        width: 300px;
        aspect-ratio: 1;
        position: relative;
        border-radius: 50%;
        padding: 10px;
        grid-column: 2/3;
        grid-row: 1/3;
        align-self: center;
        justify-self: flex-end;

        /* box-shadow: 5px 5px 10px rgba(172, 255, 47, 0.158); */
        .image {
            width: 100%;
            aspect-ratio: 1;
            border-radius: inherit;
            z-index: 10;
            overflow: hidden;
            border: 5px solid var(--accent-color-1);
            box-shadow: 0 0 0px 5px var(--bg-color-900);



            & img {


                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: inherit;
                filter: grayscale(0.5);

            }
        }

        .image::before,
        .image::after {
            content: "";
            width: 100%;
            height: 100%;
            border-radius: inherit;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            background-size: cover;
            background-position: center;
        }

        .image::before {
            background: conic-gradient(from var(--gradient-deg) at 50% 50%,
                    var(--accent-color-1) var(--gradient-width),
                    transparent var(--gradient-width));
            animation: rotateConicGradient 10s linear infinite;
        }

        .image::after {
            background: conic-gradient(from var(--gradient-deg) at 50% 50%,
                    var(--accent-color-1) var(--gradient-width),
                    transparent var(--gradient-width));
            animation: rotateConicGradient2 var(--animation-diration) linear infinite;
        }
    }
}










@keyframes rotateConicGradient {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes rotateConicGradient2 {
    from {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(540deg);
    }
}



h1 {
    font-size: 3rem;
    letter-spacing: 1.25px;


}







.flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4rem;
}


@media screen and (max-width:730px) {

    .flex {

        justify-content: center;
        align-items: center;
        gap: 2rem;
        flex-direction: column;
        flex-wrap: wrap;
    }

}

@media screen and (max-width:600px) {
    .header {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;


        .header-content {
            grid-column: 1/2;
            grid-row: 1/2;
            margin-bottom: 0;


            >* {
                transform: translateY(0px);
            }
        }

        .header-social {
            grid-column: 1/2;
            grid-row: 3/4;
            padding-bottom: 0.5rem;
            padding-top: 1.5rem;
            padding-left: 0;
            justify-self: center;


        }

        .header-image {
            grid-column: 1/2;
            grid-row: 2/3;
            justify-self: center;
        }
    }

    .flex {
        flex-wrap: nowrap;
        flex-direction: row;


    }

}
</style>