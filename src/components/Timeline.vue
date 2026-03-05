<script setup>
const timelineItems = [
  {
    dateRange: '2026 — Present',
    title: 'Junior Web Developer',
    company: 'Self employed',
    description: 'Development of Outstanding interfaces and web solutions'
  },
  {
    dateRange: '2023 - 2026',
    title: 'Student',
    company: 'CS50 by Havard University via EDX Online Academy',
    description: ''
  },
]
</script>

<template>
  <section class="dark-bg">
    <div class="timeline">
      <h3 class="section-title">Experience</h3>
      <div>
        <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item">
          <div class="timeline-date">{{ item.dateRange }}</div>
          <div class="timeline-body">
            <strong>{{ item.title }}</strong>
            <div class="muted">{{ item.company }} — {{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dark-bg {
  background: var(--dark);
}

.timeline {
  position: relative;
  display: block;
  max-width: var(--max-width);
  margin: 30px auto;
  padding: 30px;
}

.section-title {
  color: white;
  margin: 0 0 12px;
  font-size: 28px;
}

.timeline-item {
  display: flex;
  gap: 50px;
  margin-bottom: 20px;
  width: 100%;
}

.timeline-date {
  width: 110px;
  color: var(--gold);
  font-weight: 700;
  flex-shrink: 0;
}

.timeline-body {
  color: #e6e7e8;
}

.timeline-body strong {
  color: white;
}

.timeline-body .muted {
  margin-top: 0;
}

.muted {
  color: var(--muted);
  margin-top: 6px;
}

/* Mobile: Stack layout */
@media (max-width: 640px) {
  .timeline {
    padding: 20px;
  }
  
  .timeline-item {
    flex-direction: column;
    gap: 8px;
  }
  
  .timeline-date {
    width: 100%;
    font-size: 14px;
  }
}
</style>
