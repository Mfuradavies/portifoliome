<script setup>
import { ref, onMounted, computed } from 'vue'
import { auth } from '../services/firebase' // Make sure this is exported in your firebase.js
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { newsletterService } from '../services/newsletter'

const subscribers = ref([])
const isLoading = ref(false)
const isAuthenticated = ref(false)
const emailInput = ref('') // Added for real login
const passwordInput = ref('')

// 1. Monitor Auth State
// This keeps you logged in even if you refresh the page
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true
      loadSubscribers()
    } else {
      isAuthenticated.value = false
    }
  })
})

const authenticate = async () => {
  isLoading.value = true
  try {
    // REAL AUTH: This verifies your identity with Firebase
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    // onAuthStateChanged handles the rest!
  } catch (error) {
    console.error('Login error:', error)
    alert('Invalid credentials! Make sure you created this user in the Firebase Console.')
  } finally {
    isLoading.value = false
  }
}

const loadSubscribers = async () => {
  isLoading.value = true
  try {
    const data = await newsletterService.getAllSubscribers()
    // Sort by signupTime (using the field name from your service)
    subscribers.value = data.sort((a, b) => {
      const dateA = a.signupTime?.seconds || 0
      const dateB = b.signupTime?.seconds || 0
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error loading subscribers:', error)
    alert('Permission Denied. Check your Firestore Rules.')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  // Handle Firestore Timestamp objects
  const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}

const exportToCSV = () => {
  if (subscribers.value.length === 0) return

  const headers = ['Name', 'Email', 'Signup Time', 'Status']
  const rows = subscribers.value.map(sub => [
    sub.name,
    sub.email,
    formatDate(sub.signupTime), // Corrected field name
    sub.status || 'active'
  ])

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const logout = async () => {
  await signOut(auth)
  subscribers.value = []
}

const subscriberCount = computed(() => subscribers.value.length)
</script>

<template>
  <div class="admin-dashboard">
    <section id="admin">
      <div class="constrain">
        <!-- Authentication Form -->
        <div v-if="!isAuthenticated" class="auth-container">
          <div class="auth-box">
            <h2>Admin Dashboard</h2>
            <p class="subtitle">Enter password to access subscriber data</p>
            <form @submit.prevent="authenticate">
              <input 
                v-model="emailInput"
                type="email"
                placeholder="Enter admin email"
                required />
              <input 
                v-model="passwordInput"
                type="password"
                placeholder="Enter admin password"
                required />
              <button type="submit" class="btn-cta">Access Dashboard</button>
            </form>
          </div>
        </div>

        <!-- Dashboard Content -->
        <div v-else class="dashboard-container">
          <div class="dashboard-header">
            <h2>Newsletter Dashboard</h2>
            <button @click="logout" class="btn-logout">Logout</button>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-number">{{ subscriberCount }}</div>
              <div class="stat-label">Total Subscribers</div>
            </div>
          </div>

          <div class="actions">
            <button @click="loadSubscribers" class="btn-secondary" :disabled="isLoading">
              {{ isLoading ? 'Loading...' : 'Refresh' }}
            </button>
            <button @click="exportToCSV" class="btn-secondary" :disabled="subscriberCount === 0">
              Export to CSV
            </button>
          </div>

          <!-- Subscribers Table -->
          <div class="table-container">
            <table v-if="subscribers.length > 0" class="subscribers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscribed At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subscriber in subscribers" :key="subscriber.id">
                  <td>{{ subscriber.name }}</td>
                  <td>{{ subscriber.email }}</td>
                  <td>{{ formatDate(subscriber.subscribedAt) }}</td>
                  <td>
                    <span class="status-badge" :class="subscriber.status">
                      {{ subscriber.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else class="no-data">No subscribers yet</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-dashboard {
  background: var(--dark);
  min-height: 80vh;
  padding: 40px 20px;
}

.constrain {
  max-width: var(--max-width);
  margin: 0 auto;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.auth-box {
  background: rgba(255, 255, 255, 0.02);
  padding: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  max-width: 400px;
  width: 100%;
}

.auth-box h2 {
  color: white;
  margin: 0 0 10px;
  font-size: 24px;
}

.subtitle {
  color: var(--muted);
  margin-bottom: 20px;
}

.auth-box input {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
}

.dashboard-container {
  color: white;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h2 {
  margin: 0;
  font-size: 28px;
}

.btn-logout {
  background: #ff6b6b;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 8px;
}

.stat-label {
  color: var(--muted);
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.table-container {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.subscribers-table {
  width: 100%;
  border-collapse: collapse;
}

.subscribers-table thead {
  background: rgba(255, 255, 255, 0.05);
}

.subscribers-table th {
  color: var(--muted);
  padding: 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.subscribers-table td {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  color: white;
}

.subscribers-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.unsubscribed {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: var(--muted);
}

.btn-cta {
  background: var(--gold);
  color: #070707;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-cta:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 16px;
  }

  .subscribers-table {
    font-size: 14px;
  }

  .subscribers-table th,
  .subscribers-table td {
    padding: 12px;
  }

  .actions {
    flex-direction: column;
  }

  .btn-secondary {
    width: 100%;
  }
}
</style>
