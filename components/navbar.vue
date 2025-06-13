<template>
    <nav class="navbar">
        <div class="wrapper">
            <div class="logo">
                &lt; /&gt; jrgenweb
            </div>
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

<style lang="scss" scoped>
/* Alapállapot: a hero tetején áll */
.navbar-absolute {
    position: absolute;
    top: 0;
    left: 0;
}

/* Felfelé görgetéskor jelenjen meg rögzítve */
.navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

}

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


    transition: 0.3s all;

    .wrapper {

        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
}

.navbar ul {
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

.logo {

    padding: 0.5rem 1rem;

    color: #81d94d;
    font-weight: bold;
    font-size: 1.5rem;
    text-wrap: nowrap;

    & img {
        width: 100%;
        height: 100%;
        object-position: 10px -2px;

    }
}
</style>