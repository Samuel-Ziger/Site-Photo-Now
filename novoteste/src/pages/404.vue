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
      <h1 class="text-8xl font-bold my-4 text-[#EC4899]">404</h1>
      <p class="text-accent-foreground text text-xl">
        A página que você está procurando não existe ou foi movida.
      </p>
    </div>
  </AppLayout>
</template>
