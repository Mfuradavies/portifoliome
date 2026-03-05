<script setup>
import { useNavigation } from '../composables/useNavigation'

const { handleSmoothScroll } = useNavigation()
</script>

<template>
  <footer id="contact">
    <div class="constrain center footer-inner">
      <p class="muted">Interested in working together?</p>
      <a 
        class="btn-cta" 
        href="mailto:Mfuradavies@gmail.com">
        Get in touch
      </a>
      <p class="copyright">© Mfura Davies</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding: 40px 24px;
  text-align: center;
  color: #9aa0a6;
  background: var(--dark);
}

.constrain {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0;
}

.center {
  text-align: center;
}

.footer-inner {
  padding: 28px 24px;
}

.muted {
  color: var(--muted);
  margin-top: 6px;
  margin-bottom: 12px;
}

.btn-cta {
  display: inline-block;
  background: var(--gold);
  color: #070707;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-cta:hover {
  opacity: 0.9;
  scale: 1.05;
  background-color: #066f9b;
}

.copyright {
  margin-top: 22px;
  color: #6f7579;
  margin-bottom: 0;
}
</style>
