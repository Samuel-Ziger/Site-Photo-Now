<script setup lang="ts">
import PhotoNowLogo from '@/assets/logo.svg'
import PhoneOnIvoiceSvg from '@/assets/phone-on-invoice.svg'
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
      <img :src="PhoneOnIvoiceSvg" />
    </div>

    <div class="flex flex-col justify-center items-center">
      <h1 class="text-center mt-10 text-2xl font-medium mb-3">
        Envio da nota fiscal
      </h1>
      <p class="font-inter text-[#525252] text-lg">
        Informe o seu Whatsapp ou e-mail para que possamos fazer o envio da nota
        fiscal.
      </p>
      <OrderInput title="phone" placeholder="(00) 0 0000-0000" />
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
