

<template>
  <section class="hero" autofocus>
    <div class="split">
      <div class="container">
        <div class="hero-left">
          <div class="greeting">Hi, I am <span class="gold">Mfura Davies</span></div>
          <div class="role">Software developer and <br>AI Engineer</div>

          <div class="social-row">
            <a 
              v-for="social in socialLinks"
              :key="social.href"
              :class="['social', social.class]"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label">
              <img :class="social.class"
              :src="social.icon"
              :alt="`link to ${social.label} profile`">
            </a>
          </div>
        </div>
        <div class="hero-right">
          <div class="profile-frame">
            <img 
              class="profile" 
              src="C:\Users\ELOHOME\LEARNING_PROJECTS\PORTIFOLIO\Photos-3-001\IMG_8225 (2).png" 
              alt="Mfura Davies picture" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import xicon from '../assets/ig.png';
import githubIcon from '../assets/images.png';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
const socialLinks = [
  { 
    class: 'x',
    href: 'https://x.com/DaviesMfura',
    label: 'X',
    icon: xicon
  },
  { 
    class: 'github',
    href: 'https://github.com/Mfuradavies',
    label: 'Github',
    icon: githubIcon
  },
  { 
    class: 'ig',
    href: 'https://www.instagram.com/mfura_davies/',
    label: 'Instagram',
    icon: instagramIcon
  },
  { 
    class: 'linkedin',
    href: 'https://www.linkedin.com/in/mfura-davies-a02a76221/',
    label: 'LinkedIn',
    icon: linkedinIcon
  },
]
</script>

<style scoped>
@keyframes slide-up {
  0%{
    transform: translateY(-100vw);
  }
  100%{
    transform: translateY(0vw);
  }
}

.hero {
  min-height: 82vh;
  display: flex;
  align-items: center;
}

.split {
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, var(--light) 45%, var(--black) 45%);
  position: relative;
  overflow: visible;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 48px 24px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.hero-left {
  flex: 1;
  min-width: 280px;
  padding: 40px 24px;
  animation: slide-right 1s;
}

.greeting {
  position: relative;
  z-index: 2;
  font-size: clamp(28px, 6vw, 40px);
  font-weight: 800;
  color: #08a2df;
  margin: 0;
}

.greeting .gold {
  color: var(--gold);
}

.role {
  margin-top: 14px;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 0;
}

.social-row {
  display: flex;
  gap: 10px;
  margin-top: 28px;
  animation: slide-up 1s;
}

.social {
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px rgba(11, 11, 15, 0.12);
  color: #111;
}

.social.x,
.social.github,
.social.ig {
  background-color: #000;
}

.social.linkedin {
  background: rgb(30, 115, 155);
}

.social img {
  width: 18px;
  height: 18px;
  display: inline;
}
.social img:hover{
  scale: 1.5;
}

.hero-right {
  flex: 0 0 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 30px;
  animation-name: slide-left;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-direction: normal;
}

.profile-frame {
  position: relative;
  z-index: 1;
  right: 6%;
  top: 5%;
  border: #000 1px;
  border-radius: 30px;
  transform: translateX(10%);
}

.profile {
  width: 360px;
  height: 80%;
  object-fit: cover;
  box-shadow: 0 30px 60px rgba(2, 6, 23, 0.6);
}

@media (max-width: 960px) {
  .hero-right {
    flex: 0 0 320px;
  }
  .split{
    background-color: aliceblue;
  }
  .profile {
    width: 260px;
    height: 390px;
  }
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-right {
    order: -1;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .hero-left {
    padding-top: 20px;
  }

  .greeting {
    font-size: 28px;
  }
}

</style>
