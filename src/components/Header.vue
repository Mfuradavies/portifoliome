<script setup>
import { useNavigation } from '../composables/useNavigation'

const { showMobileMenu, isMobile, toggleMobileMenu, closeMobileMenu, handleSmoothScroll } = useNavigation()

const navLinks = [
  { href: '#about', label: 'About me' },
  { href: '#skills', label: 'Skills' },
  { href: '#portfolio', label: 'Portfolio' },
]

const ctaLinks = [
  { href: '#newsletter', label: 'Newsletter', isCta: true },
  { href: '#contact', label: 'CONTACT ME', isCta: true },
]
</script>

<template>
  <header class="topbar">
    <div class="inner">
      <a class="logo" href="#" @click="(e) => handleSmoothScroll(e, '#')">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="36" height="36" rx="6" stroke="white" stroke-width="2" />
        </svg>
        Davies
      </a>

      <nav class="primary" aria-label="Main navigation" v-if="!isMobile || showMobileMenu" 
           :style="isMobile && showMobileMenu ? {
             display: 'flex',
             flexDirection: 'column',
             background: 'rgba(0,0,0,0.6)',
             position: 'absolute',
             right: '24px',
             top: '64px',
             padding: '12px'
           } : {}">
        <a v-for="link in navLinks" 
           :key="link.href"
           :href="link.href" 
           @click="(e) => { handleSmoothScroll(e, link.href) }">
          {{ link.label }}
        </a>
        <a v-for="link in ctaLinks" 
           :key="link.href"
           :href="link.href"
           :class="['btn-cta', { 'cta': link.isCta }]"
           @click="(e) => { handleSmoothScroll(e, link.href) }">
          {{ link.label }}
        </a>
      </nav>

      <button 
        v-if="isMobile"
        id="mobile-toggle" 
        @click="toggleMobileMenu"
        aria-label="Menu">
        ☰
      </button>
    </div>
  </header>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--gold);
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}

.logo svg {
  width: 36px;
  height: 36px;
}

nav.primary a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
}
nav.primary a:hover {
  color: var(--gold)
}

#mobile-toggle {
  background-color: black;
  color: rgb(13, 255, 1);
  font-size: 1.2rem;
  border: 0px solid rgb(13, 255, 1);
  cursor: pointer;
}

#mobile-toggle:hover {
  font-size: 1.4rem;
}
</style>
