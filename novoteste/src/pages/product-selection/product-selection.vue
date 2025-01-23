<script setup lang="ts">
import logoSvg from '@/assets/logo.svg'
import PhotoQuantityModal from '@/components/photo-quantity-modal.vue'
import ProductCard from '@/components/product-card.vue'
import SecondaryButton from '@/components/secondary-button.vue'
import { useGetProducts } from '@/composables/api/useGetProducts'
import { http } from '@/lib/axios'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { Pagination, Product } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const totemId = Number(route.params.totemId)
const orderId = Number(route.params.orderId)
const photoQuantityModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const products = ref<Pagination<Product>>()

function selectProduct(tp: Product) {
  selectedProduct.value = tp
  photoQuantityModal.value = true
}

async function handleCancelOrder() {
  await http.post(`/totems/${totemId}/orders/${orderId}/finish-order`)

  router.push({
    name: 'start',
    params: {
      totemId: String(totemId),
    },
  })
}

onMounted(async () => {
  try {
    const response = await useGetProducts(totemId)
    products.value = response
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="logoSvg" />
      </div>
    </header>

    <h1
      class="text-3xl font-extrabold text-[#9D174D] bg-[#FBCFE8] mb-3 inline-block"
    >
      Olá!
    </h1>

    <p class="font-normal text-xl text-[#525252] mb-4">
      Vamos começar? Selecione o produto que você deseja.
    </p>

    <div class="grid grid-cols-3 gap-4">
      <ProductCard
        v-for="tp in products?.content"
        :key="tp.id"
        :product="tp"
        @click="selectProduct(tp)"
      />
    </div>

    <div class="footer right-10">
      <SecondaryButton class="ml-auto" @click="handleCancelOrder"
        >Cancelar</SecondaryButton
      >
    </div>
    <PhotoQuantityModal
      v-model="photoQuantityModal"
      :product="selectedProduct"
    />
  </AppLayout>
</template>
