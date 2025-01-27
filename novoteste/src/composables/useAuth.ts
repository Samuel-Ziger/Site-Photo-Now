import { ref } from 'vue'

export function useAuth() {
  const isAuthenticated = ref(false)

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken')
    isAuthenticated.value = !!token
  }

  checkAuth()

  return {
    isAuthenticated,
    checkAuth,
  }
}
