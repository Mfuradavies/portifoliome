<script setup>
const services = [
  {
    icon: 'W',
    title: 'Web Development',
    description: 'Offer low-cost website designs and mockups offering connectivity and accessibility for customers.'
  },
  {
    icon: 'AI',
    title: 'AI/Automation',
    description: 'Implementation of AI tools in local businesses offering trustworthy automations.'
  },
  {
    icon: 'P',
    title: 'Prototyping',
    description: 'Interactive prototypes and motion direction to communicate micro-interactions.'
  },
]
</script>

<template>
  <section id="skills">
    <div class="constrain">
      <h3 class="section-title">Services & Skills</h3>
      <div class="services-grid">
        <div v-for="service in services" :key="service.icon" class="card">
          <div class="row">
            <div class="icon">{{ service.icon }}</div>
            <h4>{{ service.title }}</h4>
          </div>
          <p class="muted">{{ service.description }}</p>
          
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.constrain {
  max-width: 100%;
  padding: 30px;
  margin: 0;
}

.section-title {
  color: white;
  margin: 0 0 12px;
  font-size: 28px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: var(--max-width);
  margin: 0 auto;
}

.card {
  background: rgba(255, 255, 255, 0.02);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  width: 100%;
  margin: 0;
}

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 640px) {
  .constrain {
    padding: 20px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.card h4 {
  color: white;
  margin: 0 0 8px;
}

.row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--gold), #BFFF7F);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  font-weight: 800;
  flex-shrink: 0;
}

.muted {
  color: var(--muted);
  margin-top: 6px;
  margin-bottom: 0;
}

@media (max-width: 960px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
