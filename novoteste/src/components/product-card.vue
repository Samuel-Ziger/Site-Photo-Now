<script setup lang="ts">
import { Product } from '@/types'
import { defineProps } from 'vue'

interface ProductCardProps {
  product: Product
}

const props = defineProps<ProductCardProps>()

// const totemProduct = computed(() => props.product)
</script>

<template>
  <div
    class="border-2 border-[#E5E5E5] bg-[#F5F5F5] p-2 rounded-3xl cursor-pointer"
  >
    <div class="rounded-2xl overflow-hidden">
      <img
        :src="props.product.picture"
        class="rounded-2xl max-h-[164px] w-full object-cover"
      />
    </div>
    <div class="my-2">
      <h3 class="text-lg font-semibold">{{ props.product.name }}</h3>
      <p class="text-xs text-[#525252]">
        {{ props.product.description }}
      </p>
    </div>
  </div>
</template>
