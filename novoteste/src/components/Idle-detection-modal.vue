<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg">
      <h2 class="text-7xl font-semibold mb-14 text-center text-[#EC4899]">
        Tem alguém ai?
      </h2>
      <p class="mb-4 text-3xl text-center">
        Parece que o processo está demorando mais do que o esperado.
      </p>
      <p class="mb-14 text-3xl text-center">
        Confirme para continuar comprando ou sua compra será cancelada em 15
        segundos.
      </p>
      <div class="flex justify-center items-center">
        <PrimaryButton @click="resetTimer">Estou aqui</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { http } from '@/lib/axios.ts'
import PrimaryButton from '@/components/primary-button.vue'

const route = useRoute()
const router = useRouter()
const idleTime = ref<number>(0)
const showModal = ref<boolean>(false)
const idleLimit = 500
const modalTimeout = 15
let idleInterval: ReturnType<typeof setInterval>
let postModalTimeout: ReturnType<typeof setTimeout>

const resetTimer = (): void => {
  idleTime.value = 0
  showModal.value = false
  clearTimeout(postModalTimeout)
  startIdleTimer()
}

const incrementTimer = (): void => {
  idleTime.value += 1
  if (idleTime.value >= idleLimit && !showModal.value) {
    showModal.value = true
    clearInterval(idleInterval)

    postModalTimeout = setTimeout(() => {
      if (showModal.value) {
        performPostModalAction()
      }
    }, modalTimeout * 1000)
  }
}

const startIdleTimer = (): void => {
  clearInterval(idleInterval)
  idleInterval = setInterval(incrementTimer, 1000)
}

const performPostModalAction = async (): Promise<void> => {
  const orderId = Number(route.params.orderId)
  const totemId = Number(route.params.totemId)

  await http.post(`/totems/${totemId}/orders/${orderId}/finish-order`)

  resetTimer()

  router.push({
    name: 'start',
    params: {
      totemId: totemId,
    },
  })
}

const activityDetected = (): void => {
  if (showModal.value) return
  resetTimer()
}

onMounted((): void => {
  startIdleTimer()
  window.addEventListener('mousemove', activityDetected)
  window.addEventListener('keypress', activityDetected)
})

onBeforeUnmount((): void => {
  clearInterval(idleInterval)
  clearTimeout(postModalTimeout)
  window.removeEventListener('mousemove', activityDetected)
  window.removeEventListener('keypress', activityDetected)
})
</script>
