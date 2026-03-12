<template>
    <div class="contact">
        <panel>
            <h2>{{ $t('contact.h2') }}</h2>
            <p>{{ $t('contact.p') }}</p>
            <form @submit.prevent="sendEmail">
                <input-component name="name" :label="$t('contact.inputs.name')" type="text"
                    v-model="formData.name"></input-component>
                <input-component name="email" :label="$t('contact.inputs.email')" type="email"
                    v-model="formData.email"></input-component>
                <input-component name="message" :label="$t('contact.inputs.message')" type="textarea"
                    v-model="formData.message"></input-component>

                <div class="m-auto">
                    <button-component type="submit" :disabled="isSending || isFormInvalid" class="sm-m-auto">{{
                        $t('contact.inputs.button')
                    }}</button-component>
                </div>
            </form>
        </panel>
    </div>
</template>

<script setup>// 1. Importok a legtetején
import { ref } from 'vue';
import emailjs from '@emailjs/browser';

// 2. Nuxt composable-ök hívása
const config = useRuntimeConfig();

// 3. Reaktív változók definiálása
const formData = ref({ name: '', email: '', message: '' });
const isSending = ref(false);

const isFormInvalid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        formData.value.name.trim().length < 2 ||
        !emailRegex.test(formData.value.email) ||
        formData.value.message.trim().length < 10
    );
});

// 4. Függvények
const sendEmail = async () => {
    if (isFormInvalid.value) return;
    // Ellenőrizzük, hogy a kulcsok betöltődtek-e (segít a hibakeresésben)
    console.log("DEBUG - Config:", config.public.emailjsServiceId, config.public.emailjsTemplateId, config.public.emailjsPublicKey);


    isSending.value = true;

    try {
        await emailjs.send(
            config.public.emailjsServiceId,
            config.public.emailjsTemplateId,
            formData.value,
            config.public.emailjsPublicKey
        );
        alert('Üzenet elküldve!');
        // Opcionális: űrlap ürítése siker után
        formData.value = { name: '', email: '', message: '' };
    } catch (error) {
        console.error('EmailJS Error:', error);
        alert('Hiba történt a küldés során!');
    } finally {
        isSending.value = false;
    }
};

</script>
<style lang="scss" scoped>
/**flow */
h2 {}

p {
    margin-bottom: 2rem;
    margin-top: 1rem;
}



@media screen and (max-width:600px) {
    .sm-m-auto {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>