<script setup lang="ts">
import PhotoNowLogo from '@/assets/logo.svg'
import PaymentSuccessSvg from '@/assets/payment-success.svg'
import { useGetOrder } from '@/composables/api/useGetOrder'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { Order } from '@/types'
import confetti from 'canvas-confetti'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)
const totemId = Number(route.params.totemId)
const order = ref<Order | null>(null)

onMounted(async () => {
  try {
    confetti({
      particleCount: 500,
      angle: 60,
      spread: 90,
      origin: { x: 0 },
      startVelocity: 70,
    })

    confetti({
      particleCount: 500,
      angle: 120,
      spread: 90,
      origin: { x: 1, y: 0.5 },
      startVelocity: 70,
    })

    const response = await useGetOrder(totemId, orderId)
    order.value = response

    setTimeout(() => {
      router.push({
        name: 'survey',
        params: {
          totemId: String(totemId),
          orderId: String(orderId),
        },
      })
    }, 5000)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>

    <div class="flex justify-center items-center mt-48">
      <img :src="PaymentSuccessSvg" />
    </div>

    <div class="flex flex-col justify-center items-center">
      <p class="text-center mt-10 text-2xl font-normal">
        Pagamento realizado com sucesso.
      </p>
      <p class="text-center text-2xl font-normal mb-3">
        Agora aproveite seus momentos a recordar
      </p>
    </div>
  </AppLayout>
</template>
