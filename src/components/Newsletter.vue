<script setup>
import { ref } from 'vue'
import { newsletterService } from '../services/newsletter'

const name = ref('')
const email = ref('')
const subscriptionMessage = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleSubscribe = async (e) => {
  e.preventDefault()
  errorMessage.value = ''
  subscriptionMessage.value = ''

  if (!name.value.trim() || !email.value.trim()) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  isLoading.value = true

  try {
    await newsletterService.subscribe(name.value, email.value)
    subscriptionMessage.value = `${name.value}, thank you for subscribing with ${email.value}! A confirmation email will be sent soon.`
    name.value = ''
    email.value = ''
    setTimeout(() => {
      subscriptionMessage.value = ''
    }, 8000)
  } catch (error) {
    console.error('Subscription error:', error)
    if (error.code === 'OFFLINE') {
      errorMessage.value = error.message
    } else if (error.message.includes('already subscribed')) {
      errorMessage.value = 'This email is already subscribed!'
    } else {
      errorMessage.value = 'Subscription failed. Please try again.'
    }
    setTimeout(() => {
      errorMessage.value = ''
    }, 8000)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="newsletter">
    <section id="newsletter">
      <div class="constrain center">
        <h3 class="section-title">Subscribe to my Newsletter</h3>
        <p class="muted">Get the latest news, articles, and resources about AI breakthroughs sent to your inbox weekly.</p>
        <div class="boxed">
          <form @submit="handleSubscribe" autocomplete="on">
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Enter your Full name"
              required
              :disabled="isLoading"
              autocomplete="name" />
            <input 
              id="email"
              v-model="email"
              type="email" 
              placeholder="Enter your email" 
              required 
              :disabled="isLoading"
              autocomplete="email" />
            <br>
            <button type="submit" class="btn-cta" :disabled="isLoading">
              {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
            </button>
            <p v-if="subscriptionMessage" class="success-message">{{ subscriptionMessage }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.newsletter {
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

.section-title {
  color: white;
  margin: 0 0 12px;
  font-size: 28px;
}

.muted {
  color: var(--muted);
  margin-top: 6px;
  margin-bottom: 12px;
}

.boxed {
  background: rgba(255, 255, 255, 0.02);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  max-width: 500px;
  margin: 0 auto;
}

input[type="email"] {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
  outline: none;
}
input[type="name"]
{
  width: 200%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
  outline: none;
}

.btn-cta {
  background: var(--gold);
  color: #070707;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cta:hover {
  opacity: 0.9;
  scale: 1.05;
  background-color: #066f9b;
}

.success-message {
  color: var(--gold);
  margin-top: 12px;
  font-weight: 600;
}

.error-message {
  color: #ff6b6b;
  margin-top: 12px;
  font-weight: 600;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}
</style>
