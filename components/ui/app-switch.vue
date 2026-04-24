<template>
    <label class="switch">
        <input type="checkbox" :checked="checked" @change="onChange" :disabled="disabled">
        <div>
            <span>
                <slot name="option"></slot>
            </span>
            <span>
                <slot name="option2"></slot>
            </span>
        </div>
        <span class="slider"></span>
    </label>
</template>

<script setup>

const props = defineProps({
    checked: Boolean,
    disabled: Boolean
});
const emit = defineEmits(['update:checked']);

function onChange(event) {
    //console.log('changed', event.target.checked)
    emit('update:checked', event.target.checked);
}
</script>
<style lang="scss" scoped>
.switch {
    padding: 0.2rem;
    width: calc(50px + 0.6rem);
    height: 32px;
    border-radius: 30px;
    //background-color: limegreen; // #3382b8;
    color: var(--text-color-1);
    font-weight: 400;
    display: block;
    position: relative;
    // border: 1px solid rgb(79, 175, 143);

    cursor: pointer;

    div {
        text-wrap: nowrap;

        //background-color: blue;
        //width: 100%;
        border-radius: inherit;
        display: flex;
        justify-content: space-between;
        padding-inline: 0.2rem;



        span {
            transition: 0.3s all;
        }
    }

    .slider {
        width: 24px;

        aspect-ratio: 1;


        border-radius: 30px;
        padding: 0.4rem;

        position: absolute;

        background-color: var(--bg-color-100);
        z-index: 10;

        transition: 0.3s all;
        top: 0.2rem;
        left: 0.2rem;
    }

    input {
        display: none;
    }

    input[type="checkbox"]:not(:checked) {
        &+div {
            & span:first-child {
                opacity: 0;
            }
        }
    }

    input[type="checkbox"]:checked {
        &~.slider {
            right: 0.2rem;
            transform: translateX(28px);
            // background-color: lime;
        }

        &+div {
            & span:last-child {
                opacity: 0;
            }
        }
    }

    input[disabled] {
        &~.slider {
            background-color: gray;
        }
    }
}

.switch:has(input[disabled]) {
    cursor: default;
    color: lightgray;
}
</style>
