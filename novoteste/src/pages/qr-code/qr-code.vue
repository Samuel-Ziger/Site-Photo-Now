<script setup lang="ts">
import PhotoNowLogo from '@/assets/logo.svg'
import Loader from '@/components/loader.vue'
import { env } from '@/config/env-config'
import { WebSocketClient } from '@/lib/websocket'
import AppLayout from '@/pages/layouts/app-layout.vue'
import QrcodeVue from 'qrcode.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)
const totemId = Number(route.params.totemId)
const uploadingPhotos = ref(false)
const forwardUrl = computed<string>(() => {
  return `${env.VITE_PHOT_NOW_MOBILE_APP_BASE_URL}/totems/${totemId}/orders/${orderId}`
})

const text = computed(() => {
  return !uploadingPhotos.value
    ? 'Utilize o seu telefone para ler o QR code, ou acesse o link abaixo para enviar suas imagens'
    : 'Realizando upload das fotos, aguarde...'
})

function toNextPage() {
  router.push({
    name: 'editor',
    params: {
      totemId: String(totemId),
      orderId: String(orderId),
    },
  })
}

onMounted(() => {
  const client = WebSocketClient.getInstance()

  client.on('upload-started', () => {
    uploadingPhotos.value = true
  })

  client.on('upload-finished', () => {
    toNextPage()
  })
})
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>
    <div class="flex flex-col items-center justify-center mt-40">
      <div class="flex justify-center items-center">
        <QrcodeVue
          v-if="!uploadingPhotos"
          :value="forwardUrl"
          render-as="svg"
          :size="256"
        />
        <Loader v-else :size="256" :color="'#EC4899'" />
      </div>

      <p class="mb-2 text-2xl text-center mt-6">
        {{ text }}
      </p>
    </div>
  </AppLayout>
</template>
