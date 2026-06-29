export function useLocaleTransition() {
  const isTransitioning = useState('locale-transitioning', () => false)
  const { setLocale } = useI18n()

  async function switchLocale(code: string) {
    isTransitioning.value = true
    await new Promise((resolve) => setTimeout(resolve, 180))
    await setLocale(code as 'en' | 'hu')
    await nextTick()
    isTransitioning.value = false
  }

  async function fadeAndNavigate(hash: string) {
    isTransitioning.value = true
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    await new Promise((resolve) => setTimeout(resolve, 320))
    isTransitioning.value = false
  }

  return { isTransitioning, switchLocale, fadeAndNavigate }
}
