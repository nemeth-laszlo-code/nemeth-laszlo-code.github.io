<template>
    <div class="form-group" ref="formGroup">
        <label :for="name">{{ label }}</label>

        <input v-if="type !== 'textarea'" :type="type" :id="name" :name="name" :required="required" :placeholder="label"
            @blur="emit('blur')" v-model="fieldValue" />

        <textarea v-else :id="name" :name="name" rows="4" :required="required" :placeholder="label" @blur="emit('blur')"
            v-model="fieldValue"></textarea>
    </div>
</template>
<script setup>import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    type: { type: String, default: 'text' },
    label: String,
    name: String,
    required: Boolean,
    modelValue: String,   // <-- modelValue prop
})

const emit = defineEmits(['update:modelValue', 'blur'])  // <-- update:modelValue,blur esemény

const fieldValue = ref(props.modelValue || '')
const formGroup = ref(null)


watch(() => props.modelValue, (newVal) => {
    fieldValue.value = newVal
})

watch(fieldValue, (newVal) => {
    emit('update:modelValue', newVal)
})

// lebegő label JS fallback
onMounted(() => {
    const group = formGroup.value
    const input = group.querySelector('input, textarea')

    const updateState = () => {
        if (document.activeElement === input || fieldValue.value.trim() !== '') {
            group.classList.add('active')
        } else {
            group.classList.remove('active')
        }
    }

    input.addEventListener('focus', updateState)
    input.addEventListener('blur', updateState)
    watch(fieldValue, updateState)
    updateState()
})
</script>










<style scoped>
.form-group {
    position: relative;
    display: flex;
    flex-direction: column;
    
    margin-top: 32px;


    label {
        position: absolute;
        left: 10px;
        color: var(--text-color-1);
        transition: all 0.3s ease-in-out;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
    }

    textarea+label,
    &.has-textarea label {
        top: -30px;
        transform: none;
    }

    input,
    textarea {
        background-color: var(--bg-color-900);
        color: var(--text-color-1);
        padding: 10px;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;

        &::placeholder {
            opacity: 0;
        }

        &:focus {
            outline: 1px solid var(--accent-color-4);
        }
    }

    label:has(+textarea) {
        top: 22px;
    }

    &.active label {
        transform: translateY(-50px) scale(0.96);

    }
}
</style>
