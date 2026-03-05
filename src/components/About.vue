<script setup>
import { useNavigation } from '../composables/useNavigation'

const { handleSmoothScroll } = useNavigation()

const infoItems = [
  { label: 'Email', value: 'Mfuradavies@gmail.com' },
  { label: 'Phone', value: '+250 782 155 242' },
  { label: 'Location', value: 'Kigali, Rwanda' },
  { label: 'Availability', value: 'Freelance & Full-time Dev & Student' },
]
</script>

<template>
  <section id="about" class="dark-bg">
    <div class="about">
      <div class="about-photo">
        <!-- Placeholder for about photo -->
      </div>
      <div>
        <h2 class="section-title">About me</h2>
        <p class="details">
          I'm a young and enthusiastic engineer breaking into the field of software development and implementing
          AI solutions in businesses via developing custom tailored tools or consultation
        </p>

        <div class="info-list">
          <div v-for="item in infoItems" :key="item.label" class="info-item">
            <strong>{{ item.label }}</strong>
            <div class="muted">{{ item.value }}</div>
          </div>
        </div>

        <a 
          class="download" 
          href="#contact"
          @click="(e) => handleSmoothScroll(e, '#contact')">
          Contact me
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dark-bg {
  background: var(--dark);
}

.about {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 28px;
  align-items: center;
}

.about-photo {
  width: 260px;
  border-radius: 12px;
  overflow: hidden;
}

.about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.details {
  color: #cbd0d3;
  margin: 0 0 20px 0;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 18px;
  margin-bottom: 20px;
}

.info-item {
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.info-item strong {
  color: white;
}

.download {
  text-decoration: none;
  background: var(--gold);
  color: #0b0b0b;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  display: inline-block;
  cursor: pointer;
}

.download:hover {
  background-color: #066f9b;
  opacity: 0.9;
  scale: 1.05;
}

@media (max-width: 960px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
