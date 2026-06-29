<script setup lang="ts">
import { Mail, MapPin, Send, Phone } from 'lucide-vue-next'
import emailjs from '@emailjs/browser'

const { t } = useI18n()
const config = useRuntimeConfig()
const { el, isVisible } = useScrollReveal()

const formRef = ref<HTMLFormElement | null>(null)
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const formData = reactive({
  name: '',
  email: '',
  message: '',
})

async function handleSubmit() {
  if (!formRef.value) return
  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    await emailjs.sendForm(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      formRef.value,
      config.public.emailjsPublicKey
    )
    submitStatus.value = 'success'
    formData.name = ''
    formData.email = ''
    formData.message = ''
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" ref="el" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div :class="[
        'text-center mb-12',
        isVisible ? 'animate-fade-in-up' : 'opacity-0',
      ]">
        <h2 class="mb-4 text-3xl sm:text-4xl">{{ t('contact.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact info -->
        <div :class="[
          'lg:col-span-1 space-y-6',
          isVisible ? 'animate-fade-in-left' : 'opacity-0',
        ]" style="animation-delay: 100ms">
          <div class="bg-white dark:bg-slate-800 p-6 rounded-xl">
            <div class="flex items-start gap-4 mb-6">
              <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Mail class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 class="mb-1">{{ t('contact.email') }}</h3>
                <a href="mailto:nemeth.laszlo.code@gmail.com"
                  class="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                  nemeth.laszlo.code@gmail.com
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4 mb-6">
              <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Phone class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 class="mb-1">{{ t('contact.phone') }}</h3>
                <a href="tel:+36301234567"
                  class="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                  +36 70 606 9252
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <MapPin class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 class="mb-1">{{ t('contact.location') }}</h3>
                <p class="text-gray-600 dark:text-gray-400">{{ t('contact.locationValue') }}</p>
              </div>
            </div>
          </div>

          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
            <p class="text-emerald-700 dark:text-emerald-300 font-semibold mb-2">
              {{ t('contact.quickResponse') }}
            </p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ t('contact.quickResponseDesc') }}
            </p>
          </div>
        </div>

        <!-- Contact form -->
        <form ref="formRef" :class="[
          'lg:col-span-2 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl',
          isVisible ? 'animate-fade-in-right' : 'opacity-0',
        ]" style="animation-delay: 100ms" @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <div>
              <label for="name" class="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                {{ t('contact.form.name') }} *
              </label>
              <input id="name" v-model="formData.name" type="text" name="from_name" required
                :placeholder="t('contact.form.namePlaceholder')"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-gray-100" />
            </div>

            <div>
              <label for="email" class="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                {{ t('contact.form.email') }} *
              </label>
              <input id="email" v-model="formData.email" type="email" name="from_email" required
                :placeholder="t('contact.form.emailPlaceholder')"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-gray-100" />
            </div>

            <div>
              <label for="message" class="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                {{ t('contact.form.message') }} *
              </label>
              <textarea id="message" v-model="formData.message" name="message" required rows="6"
                :placeholder="t('contact.form.messagePlaceholder')"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-gray-900 dark:text-gray-100" />
            </div>

            <!-- Status messages -->
            <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0">
              <p v-if="submitStatus === 'success'" class="text-emerald-600 dark:text-emerald-400 font-medium">
                {{ t('contact.form.success') }}
              </p>
              <p v-else-if="submitStatus === 'error'" class="text-red-600 dark:text-red-400 font-medium">
                {{ t('contact.form.error') }}
              </p>
            </Transition>

            <button type="submit" :disabled="isSubmitting"
              class="w-full px-6 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed">
              <Send class="w-5 h-5" />
              {{ isSubmitting ? '...' : t('contact.form.send') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
