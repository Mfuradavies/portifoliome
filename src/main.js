
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AdminDashboard from './components/AdminDashboard.vue'

const routes = [
  
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
