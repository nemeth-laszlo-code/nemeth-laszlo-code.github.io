<template>
    <div class="contact">
        <panel>
            <h2>Kapcsolat</h2>
            <form>
                <input-component name="name" label="Név" type="text" ref="nameInputText"></input-component>
                <input-component name="email" label="Email" type="email" ref="emailInputText"></input-component>
                <input-component name="message" label="Üzenet" type="textarea" ref="messageInputText"></input-component>

                <button-component @click="emailSendEvent($event)">Üzenet küldése</button-component>
            </form>
        </panel>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const nameInputText = ref();
const emailInputText = ref();
const messageInputText = ref();

function emailSendEvent($event) {
    $event.preventDefault();

    console.log(
        nameInputText.value.getValue(), emailInputText.value.getValue(), messageInputText.value.getValue())

}






</script>
<style lang="scss" scoped>
/**flow */
h2 {
    margin-bottom: 2rem;
}
</style>