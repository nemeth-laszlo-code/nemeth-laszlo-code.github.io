<template>
    <div>
        <button>
            <slot />
        </button>
    </div>
</template>


<style lang="scss">
button {
    padding: 10px 20px;
    text-transform: uppercase;
    background-color: #3282b8;
    border: 0;
    border-bottom: 1px solid limegreen;
    outline: none;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    transition: 0.3s all;

    &:active {
        scale: 0.8;
    }
}

button.secondary {

    background-color: yellowgreen;
    background-color: transparent;

    //padding: 5px 10px;
    border: 0;
    outline: 2px solid yellowgreen;
    margin-left: 5rem;

    &:hover {
        background-color: yellowgreen;
    }

}
</style>