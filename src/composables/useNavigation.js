import { ref, onMounted, onUnmounted } from 'vue'

export function useNavigation() {
  const showMobileMenu = ref(false)
  const isMobile = ref(false)

  const checkMobileView = () => {
    isMobile.value = window.innerWidth <= 960
    if (!isMobile.value) {
      showMobileMenu.value = false
    }
  }

  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  const closeMobileMenu = () => {
    showMobileMenu.value = false
  }

  const handleSmoothScroll = (e, hash) => {
    e.preventDefault()
    
    if (!hash || hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      closeMobileMenu()
      return
    }

    const target = document.querySelector(hash)
    if (!target) return

    const headerOffset = 72
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })

    if (history.pushState) {
      history.pushState(null, '', hash)
    } else {
      location.hash = hash
    }

    closeMobileMenu()
  }

  onMounted(() => {
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobileView)
  })

  return {
    showMobileMenu,
    isMobile,
    toggleMobileMenu,
    closeMobileMenu,
    handleSmoothScroll,
  }
}
