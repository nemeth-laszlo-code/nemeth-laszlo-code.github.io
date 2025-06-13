<template>
    <div class="contact">
        <panel>
            <h2>Contact Me</h2>
            <form>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Név" />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Email" />
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="4" required placeholder="Üzenet"></textarea>
                </div>
                <button-component class="m-auto">Send Message</button-component>
            </form>
        </panel>
    </div>
</template>
<style lang="scss">
/* kapcsolat */
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    position: relative;

    label {
        position: absolute;
        margin-bottom: 0.5rem;
        color: white;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
    }
}

input::placeholder,
textarea::placeholder {
    opacity: 0;
}

input,
textarea {
    background-color: var(--bg-color-900);
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: 0px solid #ccc;
    transition: all 0.3s ease-in-out;
}

input:focus,
textarea:focus {
    background-color: var(--bg-color-900);

    outline: 1px solid limegreen;

    ~label {
        color: limegreen;
    }
}

label {
    transition: all 0.3s ease-in-out;
    cursor: text;
}

label:has(+ input:focus),
label:has(+ textarea:focus),
label:has(+ :not(input:placeholder-shown)) {
    transform: translateY(-35px);
}

.m-auto {
    margin: auto;
    display: block;
}
</style>