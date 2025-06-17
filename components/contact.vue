<template>
    <div class="contact">
        <panel>
            <h2>{{ $t('contact.h2') }}</h2>
            <p>{{ $t('contact.p') }}</p>
            <form>
                <input-component name="name" :label="$t('contact.inputs.name')" type="text"
                    v-model="nameInputText"></input-component>
                <input-component name="email" :label="$t('contact.inputs.email')" type="email"
                    v-model="emailInputText"></input-component>
                <input-component name="message" :label="$t('contact.inputs.message')" type="textarea"
                    v-model="messageInputText"></input-component>

                <div class="m-auto">
                    <button-component @click="emailSendEvent($event)" class="sm-m-auto">{{ $t('contact.inputs.button')
                        }}</button-component>
                </div>
            </form>
        </panel>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const nameInputText = ref('');
const emailInputText = ref('');
const messageInputText = ref('');

function emailSendEvent($event) {
    $event.preventDefault();

    //console.log(nameInputText.value, emailInputText.value, messageInputText.value, 'ok')

}






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