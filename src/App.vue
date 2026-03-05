<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Services from './components/Services.vue'
import Timeline from './components/Timeline.vue'
import Portfolio from './components/Portfolio.vue'
import Newsletter from './components/Newsletter.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <main>
      <router-view />
    </main>
  <div :class="{'admin': $route.path === '/admin', 'public': $route.path !== '/admin'}">
    <Header />
    <div class="box">
      <Hero />
      <About />
      <span class="service"><Services />
      <Timeline /></span>
      <Portfolio />
      <Newsletter />
    </div>
    <Footer />
  </div>
</template>

<style>
@import './assets/styles.css';

#app {
  width: 100%;
  margin: 0;
  padding: 0;
}
.public-nav{
  display: none;
}
.admin{
  display: none;
}
</style>
