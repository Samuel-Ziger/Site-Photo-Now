<script setup lang="ts">
import CpfOnIvoiceSvg from '@/assets/cpf-on-invoice.svg'
import PhotoNowLogo from '@/assets/logo.svg'
import OrderInput from '@/components/order-input.vue'
import OutlineButton from '@/components/outline-button.vue'
import PrimaryButton from '@/components/primary-button.vue'
import SecondaryButton from '@/components/secondary-button.vue'
import AppLayout from '@/pages/layouts/app-layout.vue'
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>

    <div class="flex justify-center items-center mt-28">
      <img :src="CpfOnIvoiceSvg" />
    </div>

    <div class="flex flex-col justify-center items-center">
      <h1 class="text-center mt-10 text-2xl font-medium mb-3">CPF na nota</h1>
      <p class="font-inter text-[#525252] text-lg">
        Insira o CPF que deseja incluir na nota fiscal
      </p>
      <OrderInput title="cpf" placeholder="000.000.000-00" />
    </div>

    <div class="footer right-10">
      <div class="flex gap-x-2">
        <OutlineButton>Pular</OutlineButton>
        <SecondaryButton class="ml-auto">Voltar</SecondaryButton>
        <PrimaryButton>Continuar</PrimaryButton>
      </div>
    </div>
  </AppLayout>
</template>
