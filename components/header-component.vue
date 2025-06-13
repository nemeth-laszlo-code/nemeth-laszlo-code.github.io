<template>
    <panel>
        <header>
            <div class="header-content">
                <p>Hello a nevem</p>
                <h1>Németh László</h1>
                <h2>Frontend fejlesztő vagyok.</h2>
                <div class="flex">
                    <social-links></social-links>
                    <button class="secondary">CV letöltése</button>
                </div>
            </div>
            <div class="header-image">
                <div class="image">
                    <img src="/images/profile.jpg" alt="" />
                </div>
            </div>
        </header>
    </panel>
</template>

<style lang="scss" scoped>
.header-image {
    width: 300px;
    aspect-ratio: 1;
    position: relative;
    border-radius: 50%;
    padding: 10px;
    /* box-shadow: 5px 5px 10px rgba(172, 255, 47, 0.158); */
}

.image {
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
    border-radius: inherit;
    z-index: 10;

    /* csak a középre igazításhoz */

    overflow: hidden;
    border: 5px solid greenyellow;
    box-shadow: 0 0 0px 5px var(--bg-color-800);

    & img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
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
            var(--color-1) var(--gradient-width),
            transparent var(--gradient-width));
    animation: rotateConicGradient 10s linear infinite;
}

.image::after {
    background: conic-gradient(from var(--gradient-deg) at 50% 50%,
            var(--color-2) var(--gradient-width),
            transparent var(--gradient-width));
    animation: rotateConicGradient2 var(--animation-diration) linear infinite;
}



header {
    position: relative;
    z-index: 1;
    display: flex;

    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    flex-grow: 2;
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

.header-content {

    inset: 0;
    padding: 1rem;
    flex: 1;

}


.flex {
    display: flex;
    align-items: center;
    padding-block: 1rem;
    flex-wrap: wrap;
}
</style>