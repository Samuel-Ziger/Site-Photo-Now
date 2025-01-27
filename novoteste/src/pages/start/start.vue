<script setup lang="ts">
import PhotoNowLogo from '@/assets/logo.svg'
import Loader from '@/components/loader.vue'
import { useGetTotem } from '@/composables/api/useGetTotem'
import { useStartOrder } from '@/composables/api/useStartOrder'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BannerCarousel from './components/banner-carousel.vue'

const route = useRoute()
const router = useRouter()
const totemId = Number(route.params.totemId) ? Number(route.params.totemId) : -1
const loading = ref(true)

onMounted(async () => {
  if (totemId === -1) {
    router.push({ name: 'not-found' })
    return
  }

  try {
    await useGetTotem(totemId)
  } catch (error) {
    console.error(error)
    router.push({ name: 'not-found' })
  } finally {
    loading.value = false
  }
})

async function startOrder() {
  try {
    const order = await useStartOrder({ totemId })

    router.push({
      name: 'product-selection',
      params: {
        totemId: String(totemId),
        orderId: String(order.id),
      },
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <AppLayout>
    <template v-if="!loading">
      <BannerCarousel />
      <div class="flex-auto h-[14%] flex items-center justify-between p-6">
        <img :src="PhotoNowLogo" />

        <RouterLink
          to="#"
          class="font-extrabold text-3xl text-[#9D174D] bg-[#FBCFE8] cursor-pointer"
          @click="startOrder"
        >
          Toque na tela <br />
          para começar
        </RouterLink>
      </div>
    </template>
    <template v-else>
      <div class="h-full w-full flex justify-center items-center">
        <Loader />
      </div>
    </template>
  </AppLayout>
</template>
