<script setup>
const portfolioItems = [
  {
    src: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80',
    alt: 'Portfolio work 1'
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    alt: 'Portfolio work 2'
  },
]
</script>

<template>
  <section id="portfolio">
    <div class="constrain">
      <h3 class="section-title">Portfolio</h3>
      <div class="portfolio-grid">
        <div v-for="(item, index) in portfolioItems" :key="index" class="portfolio-item">
          <img :src="item.src" :alt="item.alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.constrain {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0;
}

.section-title {
  color: white;
  margin: 0 0 12px;
  font-size: 28px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.portfolio-item {
  border-radius: 10px;
  overflow: hidden;
}

.portfolio-item img {
  width: 100%;
  display: block;
  filter: grayscale(60%);
  transition: filter 0.3s ease;
}

.portfolio-item:hover img {
  filter: grayscale(0%);
}
</style>
