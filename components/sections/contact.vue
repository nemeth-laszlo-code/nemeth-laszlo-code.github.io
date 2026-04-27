<template>
    
        <app-panel class="contact">
            <Transition name="fade" mode="out-in">
                <div v-if="!isSuccess" :key="$i18n.locale">
                    <h2 class="text-h2 uppercase">{{ $t('contact.h2') }}</h2>
                    <p class=" mt-4 mb-10"> {{ $t('contact.p') }}</p>
                    <form @submit.prevent="sendEmail" class="">
                        <app-input name="name" :label="$t('contact.inputs.name')" type="text" v-model="formData.name"
                            @blur="touch('name')" class="input" />
                        <span class="error-msg">{{ errors.name }}</span>

                        <app-input name="email" :label="$t('contact.inputs.email')" type="email"
                            v-model="formData.email" @blur="touch('email')" class="input" />
                        <span class="error-msg">{{ errors.email }}</span>

                        <app-input name="message" :label="$t('contact.inputs.message')" type="textarea" class="input"
                            v-model="formData.message" @blur="touch('message')" />
                        <span class="error-msg">{{ errors.message }}</span>

                        <div class="m-auto">
                            <app-button type="submit" :disabled="isSending || !isFormValid" class="sm-m-auto">
                                {{ isSending ? '...' : $t('contact.inputs.button') }}
                            </app-button>

                        </div>
                    </form>

                    <div class="contact-info">
                        <a href="mailto:nemeth-laszlo-code@gmail.com">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"
                                class="contact-icon">
                                <path fill="currentColor"
                                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>
                            nemeth-laszlo-code@gmail.com
                        </a>
                        <a href="tel:+36706069252">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"
                                class="contact-icon">
                                <path fill="currentColor"
                                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                            </svg>
                            +36 70 606 9252
                        </a>
                    </div>
                </div>


                <div v-else key="success" class="success-msg">
                    <h2 style="text-align: center; margin-bottom: 2rem">Üzenet sikeresen elküldve!</h2>
                    <app-button @click="reset" style="margin-inline: auto; display: block; width: fit-content">
                        {{ $t('contact.inputs.newMessage') ?? 'Új üzenet' }}
                    </app-button>
                </div>
            </Transition>
        </app-panel>
    
</template>

<script setup>
import emailjs from '@emailjs/browser';

const config = useRuntimeConfig();

const formData = ref({ name: '', email: '', message: '' });
const isSending = ref(false);
const isSuccess = ref(false);
const touched = ref({ name: false, email: false, message: false });

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
    name: (v) => {
        if (!v.trim()) return 'Kötelező mező';
        if (v.trim().length < 2) return 'Min. 2 karakter';
        return '';
    },
    email: (v) => {
        if (!v.trim()) return 'Kötelező mező';
        if (!EMAIL_REGEX.test(v)) return 'Hibás email formátum';
        return '';
    },
    message: (v) => {
        if (!v.trim()) return 'Kötelező mező';
        if (v.trim().length < 10) return 'Még ' + (10 - v.trim().length) + ' karakter';
        return '';
    },
};

const errors = computed(() =>
    Object.fromEntries(
        Object.entries(validators).map(([field, validate]) => [
            field,
            touched.value[field] ? validate(formData.value[field]) : '',
        ])
    )
);

const isFormValid = computed(() =>
    Object.entries(validators).every(([field, validate]) => !validate(formData.value[field]))
);

const touch = (field) => (touched.value[field] = true);

const touchAll = () =>
    Object.keys(touched.value).forEach((field) => (touched.value[field] = true));

const reset = () => {
    formData.value = { name: '', email: '', message: '' };
    touched.value = { name: false, email: false, message: false };
    isSuccess.value = false;
};

const sendEmail = async () => {
    touchAll();
    if (!isFormValid.value) return;

    isSending.value = true;
    try {
        await emailjs.send(
            config.public.emailjsServiceId,
            config.public.emailjsTemplateId,
            formData.value,
            config.public.emailjsPublicKey
        );
        isSuccess.value = true;
        formData.value = { name: '', email: '', message: '' };
        touched.value = { name: false, email: false, message: false };
    } catch (error) {
        console.error('EmailJS hiba:', error);
    } finally {
        isSending.value = false;
    }
};
</script>
<style scoped>
@reference "@/assets/css/main.css";

p {
    
}

.contact-info {
    @apply mt-8 flex flex-col gap-4 w-fit mx-auto;

    a {
        @apply flex items-center gap-2 text-text-1 no-underline transition-colors duration-300;

        svg {
            @apply w-5 h-5;
        }

        &:hover {
            @apply text-accent-2;
        }
    }
}

@media screen and (max-width: 600px) {
    .sm-m-auto {
        @apply flex items-center justify-center;
    }
}

.input {
    @apply mb-8;

    &:has(+span) {
        @apply mb-2;
    }

    &~span {
        @apply block mb-8 text-[0.8rem] text-red-600;
    }
}
</style>