<script setup lang="ts">
interface PaymentMethodCardProps {
  title: string
  description: string
  link: string
}

const props = defineProps<PaymentMethodCardProps>()
</script>

<template>
  <RouterLink :to="props.link">
    <div class="bg-[#F5F5F5] border-2 border-[#E5E5E5] rounded-lg p-4">
      <div class="mb-2">
        <slot name="icon"></slot>
      </div>
      <h2 class="font-inter text-[#0A0A0A] text-lg mb-1">{{ props.title }}</h2>
      <p class="font-inter text-xs text-[#525252]">
        {{ props.description }}
      </p>
    </div>
  </RouterLink>
</template>
