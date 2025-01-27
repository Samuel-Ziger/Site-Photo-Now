<script setup lang="ts">
import PrimaryButton from '@/components/primary-button.vue'
import { useGetOrder } from '@/composables/api/useGetOrder'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { useEditorStore } from '@/store/editorStore'
import { Order } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditableImageList from './components/editable-image-list.vue'
import EditorHeader from './components/editor-header.vue'
import ImageEditor from './components/editor.vue'

const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)
const totemId = Number(route.params.totemId)
const order = ref<Order | null>(null)
const editorStore = useEditorStore()

function toPaymenthMethod() {
  router.push({
    name: 'select-payment-method',
    params: {
      totemId: String(totemId),
      orderId: String(orderId),
    },
  })
}

onMounted(async () => {
  if (!orderId || orderId === -1 || !totemId || totemId === -1) {
    router.push({ name: 'not-found' })
    return
  }
  try {
    const response = await useGetOrder(totemId, orderId)
    order.value = response
    editorStore.setOrder(response)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <AppLayout>
    <EditorHeader />

    <div class="flex justify-between gap-4">
      <ImageEditor />
    </div>

    <div class="mt-10">
      <EditableImageList />
    </div>

    <div class="footer right-10">
      <PrimaryButton @click="toPaymenthMethod" class="ml-auto"
        >Finalizar</PrimaryButton
      >
    </div>
  </AppLayout>
</template>
