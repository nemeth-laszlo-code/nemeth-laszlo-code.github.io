<template>



    <div class="form-group" v-if="type !== 'textarea'">
        <label :for="name">{{ label }}:</label>
        <input :type="type" :id="name" :name="name" :required="required" :placeholder="label" :value="localValue"
            @input="onInput" />
    </div>

    <div class="form-group" v-else>
        <label :for="name">{{ label }}:</label>
        <textarea :id="name" :name="name" rows="4" :required="required" :placeholder="label" :value="localValue"
            @input="onInput"></textarea>
    </div>





</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
    type: String,
    label: String,
    name: String,
    required: Boolean,
    value: String

})
const localValue = ref(props.value || '');
watch(() => props.value, (newVal) => {
    localValue.value = newVal
})
function onInput(e) {
    localValue.value = e.target.value
}
function getValue() {
    return localValue.value;
}
defineExpose({ getValue })
</script>










<style lang="scss" scoped>
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    position: relative;

    label {
        position: absolute;
        margin-bottom: 0.5rem;
        color: white;
        left: 10px;
        transition: all 0.3s ease-in-out;
        cursor: text;
    }

    //ha nem textarea akkor
    &:not(:has(textarea)) {
        label {
            top: 50%;
            transform: translateY(-50%);
        }
    }

    //ha textarea
    &:has(textarea) {
        label {
            top: 10px;
        }
    }


    input,
    textarea {
        background-color: var(--bg-color-900);
        color: white;
        padding: 10px;
        border-radius: 5px;
        border: 0px solid #ccc;
        transition: all 0.3s ease-in-out;

        &::placeholder {
            opacity: 0;
        }

        &:focus {
            background-color: var(--bg-color-900);
            outline: 1px solid limegreen;
        }


    }
}

// sima inputokra vonatkozo
label:has(+ input:focus),
label:has(+ input:not(:placeholder-shown)) {
    transform: translateY(-45px);
    scale: 0.96;
}



//textarea-ra  vonatkozo 
label:has(+ textarea:focus),
label:has(+ textarea:not(:placeholder-shown)) {
    transform: translateY(-35px) scale(0.96);

}


/* Autofill eltüntetése */
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: #333 !important;
    transition: background-color 5000s ease-in-out 0s !important;
    background-color: red;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #f0f0f0 inset !important;
    box-shadow: 0 0 0px 1000px #f0f0f0 inset !important;
    -webkit-text-fill-color: #000 !important;
    transition: background-color 5000s ease-in-out 0s !important;
}
</style>
