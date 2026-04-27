<template>
    <app-panel>

        <div class="info-box">

            <div class="orbit">
                <p style="width:150px">
                    <Transition name="fade" mode="out-in">
                        <h2 :key="$i18n.locale">
                            {{ $t('orbit.h2') }}</h2>
                    </Transition>
                </p>

                <ul class="orbit-container">
                    <li class="orbit-item" :style="'--i:'+orbitItem.order" v-for="orbitItem in orbitData" :key="orbitItem.order">
                        <img :src="orbitItem.src" :alt="orbitItem.alt" :title="orbitItem.title" />
                    </li>                   
                </ul>
            </div>

            <div class="info pl-2">
                 <h2 class="text-h3 uppercase my-2">
                            {{ $t('orbit.h2') }}</h2>
                <div class="techstack">
                    <div class="tech-item" v-for="techItem in techStackData">
                        <app-progressbar :progress=100 :title="techItem"></app-progressbar>
                    </div>
                </div>
            </div>

        </div>
    </app-panel>
</template>
<script setup>
import { ORBIT_DATA, ORBIT_TECH_STACK_DATA } from '~/data/orbit';


const orbitData = ORBIT_DATA;
const techStackData = ORBIT_TECH_STACK_DATA;
</script>
<style scoped>
@reference "@/assets/css/main.css";
@utility paused {
    animation-play-state: paused;
}

@utility running {
    animation-play-state: running;
}
.info-box {
    @apply relative w-[350px] h-[350px] overflow-hidden p-0 max-h-[350px]  -m-4 md:-m-6;

    .orbit {
        --count: 12;
        --i: 0;
        --orbit-item-size: 50px;
        --radius: 130px;

        @apply w-[inherit] aspect-square relative rounded-full grid place-content-center transition-all duration-300 ease-in-out overflow-hidden p-4;
        animation: spin 100s linear infinite;

        p {
            @apply p-4 rounded-full aspect-square flex items-center justify-center whitespace-normal font-bold uppercase;
            font-family: 'Space Grotesk', 'sans-serif';
            box-shadow: -4px -4px 8px var(--orbit-box-shadow-color-1), 5px 5px 8px var(--orbit-box-shadow-color-2);
            animation: spin 100s linear infinite reverse;
        }

        .orbit-container {
            @apply rounded-[inherit] relative -top-[105px] left-[45px] w-full h-full;

            .orbit-item {
                @apply w-[var(--orbit-item-size)] aspect-square p-2 rounded-full grid place-content-center absolute transition-all duration-300 ease-in-out overflow-hidden border-[0px] border-bg-800 origin-center;
                transform: rotate(calc(360deg / var(--count) * var(--i) + 0deg)) translateX(calc(var(--radius))) rotate(calc(-360deg / var(--count) * var(--i) + 0deg));
                box-shadow: -4px -4px 8px var(--orbit-box-shadow-color-1), 5px 5px 8px var(--orbit-box-shadow-color-2);
                animation: spinImages 100s linear infinite reverse;
            }
        }
    }

    .orbit:hover {
        @apply p-4 cursor-pointer ; 

        p {
            @apply paused;
        }

        .orbit-container {
            .orbit-item {
                @apply paused scale-[1.08] cursor-pointer;
            }
        }
    }

    img {
        @apply w-full;
    }

    .info {
        @apply bg-bg-800 absolute w-full aspect-square z-[1000] top-[calc(100%+50px)] h-fit overflow-y-auto transition-[top] duration-300 ease-in-out;
    }

    &:hover {
        .info {
            @apply top-0;
        }
    }

    .techstack {
        @apply flex flex-col gap-4 pr-2;
    }
}

.info-box.active {
    @apply overflow-x-hidden overflow-y-auto;
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
        transform: rotate(calc(360deg / var(--count) * var(--i))) translateX(calc(var(--radius))) rotate(calc(-360deg / var(--count) * var(--i) + 360deg));
    }
}

@media screen and (max-width: 500px) {
    .info-box {
        @apply w-[290px] h-[290px];

        .orbit {
            --orbit-item-size: 40px;
            --radius: 115px;

            p {
                @apply whitespace-normal p-3;
            }

            .orbit-container {
                @apply -top-[93px] left-[55px];
            }
            .orbit-item{

                @apply bg-red-500! p-0.5!; 
                img{
                    
                }
            }
        }
    }
}
</style>
