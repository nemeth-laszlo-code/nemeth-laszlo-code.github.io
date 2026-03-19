<template>
    <div class="contact">
        <panel>
            <Transition name="fade" mode="out-in">
                <div :key="$i18n.locale">
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

                    <div class="contact-info">
                        <a href="mailto:jrgen.webdev@gmail.com">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"
                                class="contact-icon">
                                <path fill="currentColor"
                                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg> jrgen.webdev@gmail.com</a>
                        <a href="tel:+36706069252"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                width="24" height="24" class="contact-icon">
                                <path fill="currentColor"
                                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                            </svg> +36 70 606 9252</a>
                    </div>
                </div>
            </Transition>


        </panel>
    </div>
</template>

<script setup>// 1. Importok a legtetején
import { ref, Transition } from 'vue';
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


.contact-info {
    margin-top: 2rem;



    display: flex;
    flex-direction: column;
    gap: 1rem;


    width: fit-content;
    margin-inline: auto;

    a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-color-1);
        text-decoration: none;

        img {
            width: 20px;
            height: 20px;
        }

        &:hover {
            color: var(--accent-color-2);
        }
    }
}

@media screen and (max-width:600px) {
    .sm-m-auto {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>