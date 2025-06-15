<template>
    <panel>

        <div class="info-box">

            <div class="orbit">
                <p>Tech stackem</p>
                <ul class="orbit-container">
                    <li class="orbit-item" style="--i: 0">
                        <img src="/images/icons/html5.svg" alt="HTML" />
                    </li>
                    <li class="orbit-item" style="--i: 1">
                        <img src="/images/icons/css3.svg" alt="CSS" />
                    </li>
                    <li class="orbit-item" style="--i: 2">
                        <img src="/images/icons/sass.svg" alt="Sass" />
                    </li>
                    <li class="orbit-item" style="--i: 3">
                        <img src="/images/icons/bootstrap.svg" alt="Bootstrap" />
                    </li>
                    <li class="orbit-item" style="--i: 4">
                        <img src="/images/icons/js.svg" alt="javascript" />
                    </li>
                    <li class="orbit-item" style="--i: 5">
                        <img src="/images/icons/typescript.svg" alt="TypeScript" />
                    </li>
                    <li class="orbit-item" style="--i: 6">
                        <img src="/images/icons/angular.svg" alt="Angular" />
                    </li>
                    <li class="orbit-item" style="--i: 7">
                        <img src="/images/icons/vuejs.svg" alt="VueJS" />
                    </li>
                    <li class="orbit-item" style="--i: 8">
                        <img src="/images/icons/nuxt.svg" alt="Nuxt" />
                    </li>
                    <li class="orbit-item" style="--i: 9">
                        <img src="/images/icons/vscode.svg" alt="Visual Studio Code" />
                    </li>
                    <li class="orbit-item" style="--i: 10">
                        <img src="/images/icons/git.svg" alt="Git Version Control" />
                    </li>
                    <li class="orbit-item" style="--i: 11">
                        <img src="/images/icons/github_logo.svg" alt="Github" />
                    </li>
                </ul>
            </div>

            <div class="info">
                <h2>Tech stackem</h2>
                <div class="techstack">
                    <div class="tech-item">
                        <progressbar :progress=85 title="HTML5"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress="80" title="CSS3"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=60 title="BootStrap"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=60 title="JavaScript"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=50 title="TypeScript"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=50 title="Angular"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=60 title="VueJS"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=60 title="Nuxt"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=70 title="Visual Studio Code"></progressbar>
                    </div>
                    <div class="tech-item">
                        <progressbar :progress=40 title="Git"></progressbar>
                    </div>

                    <div class="tech-item">
                        <progressbar :progress=40 title="GitHub"></progressbar>
                    </div>
                </div>
            </div>

        </div>
    </panel>
</template>

<style lang="scss" scoped>
.orbit {
    --count: 12;
    --i: 0;
    --orbit-item-size: 60px;
    --radius: 130px;

    width: 350px;
    aspect-ratio: 1;

    position: relative;

    border-radius: 50%;
    display: grid;
    place-content: center;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    /*  box-shadow:
        -6px -6px 12px rgba(255, 255, 255, 0.05),
        /* világos árnyék 6px 6px 12px rgba(0, 0, 0, 0.6); */
    padding: 1rem;

    animation: spin 100s linear infinite;


    /* background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite; */
    p {
        box-shadow:
            -6px -6px 12px rgba(255, 255, 255, 0.05),
            /* világos árnyék */
            6px 6px 12px rgba(0, 0, 0, 0.6);
        padding: 1rem;
        animation: spin 100s linear infinite reverse;

        border-radius: 50%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-wrap: wrap;
        font-weight: bold;
        font-family: 'Space Grotesk', 'sans-serif';
        text-transform: uppercase
    }



    .orbit-container {
        border-radius: inherit;
        position: relative;
        top: -105px;
        left: 45px;
        width: 100%;
        height: 100%;


        .orbit-item {
            width: var(--orbit-item-size);

            aspect-ratio: 1;
            padding: 0.25rem;
            border-radius: 50%;
            background-color: rgb(252, 252, 252);
            display: grid;
            place-content: center;
            position: absolute;
            transition: 0.3s all ease-in-out;
            overflow: hidden;
            border: 10px solid #07243f;
            transform-origin: center center;
            transform: rotate(calc(360deg / var(--count) * var(--i) + 0deg)) translateX(calc(var(--radius))) rotate(calc(-360deg / var(--count) * var(--i) + 0deg));

            box-shadow:
                -6px -6px 12px rgba(255, 255, 255, 0.05),
                /* világos árnyék */
                6px 6px 12px rgba(0, 0, 0, 0.6);

            animation: spinImages 100s linear infinite reverse;


        }
    }
}


.orbit:hover {
    padding: 1rem;
    animation-play-state: paused;
    cursor: pointer;



    p {
        animation-play-state: paused;

    }

    .orbit-container {

        .orbit-item {
            animation-play-state: paused;

            scale: 1.08;
            /*transform: rotate(calc(360deg / var(--count) * var(--i) + 0deg)) translateX(200px) rotate(calc(-360deg / var(--count) * var(--i) + 0deg));*/
            cursor: pointer;



            img {}
        }
    }
}

img {
    width: 100%;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}


@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes spinImages {
    0% {
        transform: rotate(calc(360deg / var(--count) * var(--i) + 0deg)) translateX(calc(var(--radius))) rotate(calc(-360deg / var(--count) * var(--i) + 0deg));
    }

    100% {
        transform:
            rotate(calc(360deg / var(--count) * var(--i))) translateX(calc(var(--radius))) rotate(calc(-360deg / var(--count) * var(--i) + 360deg));
    }

}

.info-box {
    position: relative;
    width: 350px;
    height: 350px;
    overflow: hidden;

    max-height: 350px !important;



    .info {
        background-color: #07243f;
        position: absolute;
        width: 100%;
        aspect-ratio: 1;
        z-index: 1000;
        top: 0;
        top: calc(100% + 50px);
        height: fit-content;
        overflow-y: scroll;
        transition: top 0.3s ease-in-out;
    }

    .info::befosre {
        content: '';
        inset: 0;
        background-color: rgba(0, 0, 0, 0.76);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    &:hover {
        .info {
            top: 0;

        }
    }

    .techstack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-right: 0.5rem;



    }

}

.info-box.active {
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>