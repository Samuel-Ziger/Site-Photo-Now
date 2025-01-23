<script setup lang="ts">
import PhotoNowLogo from '@/assets/logo.svg'
import SupportSvg from '@/assets/support.svg'
import AppLayout from '@/pages/layouts/app-layout.vue'
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>

    <div class="flex justify-center items-center mt-48">
      <img :src="SupportSvg" />
    </div>

    <div class="flex flex-col justify-center items-center">
      <p class="text-accent-foreground text text-xl">
        Estamos em manutenção no momento.
      </p>
      <p class="text-accent-foreground text text-xl">
        Os serviços voltarão ao normal em alguns instantes.
      </p>
    </div>
  </AppLayout>
</template>
