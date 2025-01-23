<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'

const cls = computed(() =>
  twMerge('text-white font-semibold text-2xl bg-[#EC4899] p-8 rounded-3xl', '')
)
</script>

<template>
  <button :class="cls">
    <slot></slot>
  </button>
</template>
