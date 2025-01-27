<script setup lang="ts">
interface OrderTotalProps {
  total: string
}

const props = defineProps<OrderTotalProps>()
</script>

<template>
  <div class="bg-[#FBCFE8] flex justify-between items-center px-6 py-4">
    <span class="font-inter text-xl text-[#DB2777] font-bold"
      >Valor total:</span
    >
    <span class="font-inter text-xl text-[#DB2777]">{{ props.total }}</span>
  </div>
</template>
