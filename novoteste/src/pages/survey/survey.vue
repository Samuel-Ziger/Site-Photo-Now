<script setup lang="ts">
import FrownSvg from '@/assets/frown.svg'
import PhotoNowLogo from '@/assets/logo.svg'
import MehSvg from '@/assets/meh.svg'
import SmileSvg from '@/assets/smile.svg'
import SurveySvg from '@/assets/survey.svg'
import { useGetOrder } from '@/composables/api/useGetOrder'
import { usePrint } from '@/composables/api/usePrint'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { Order, PhotoType } from '@/types'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)
const totemId = Number(route.params.totemId)
const order = ref<Order | null>(null)

onBeforeMount(async () => {
  if (!orderId || orderId === -1 || !totemId || totemId === -1) {
    router.push({ name: 'not-found' })
    return
  }

  try {
    const response = await useGetOrder(totemId, orderId)
    order.value = response
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => order.value,
  async (order) => {
    if (!order || order?.status !== 'COMPLETED') return

    const photos = order.orderItems
      .filter((or) => or.originalPictureUrl)
      .map((or) => or.originalPictureUrl as string)

    const type = PhotoType.POLAROID

    await usePrint({
      photos,
      type,
    })

    // if (order?.paymentMethod) {
    //   switch (order.paymentMethod.code) {
    //     case "CREDIT_CARD": {
    //       handlerCreditPayment(parseFloat(order.total))
    //       break;
    //     }
    //     case "DEBIT_CARD": {
    //       handlerDeditPayment(parseFloat(order.total))
    //       break;
    //     }
    //   }
    // }
  }
)
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>

    <div class="flex justify-center items-center flex-col">
      <div class="flex justify-center items-center mt-20">
        <img :src="SurveySvg" />
      </div>

      <p class="text-center mt-10 mb-4 text-2xl font-normal">
        Aguarde um instante, suas lembranças estão <br />sendo reveladas e logo
        serão impressas no totem.
      </p>

      <p class="font-inter text-[#525252] text-lg mb-10">
        Que tal contar para gente como foi <br />sua experiência enquanto
        espera?
      </p>

      <div class="grid grid-cols-3 gap-x-3">
        <div
          class="bg-[#FEE2E2] border border-[#FCA5A5] px-20 py-24 flex flex-col gap-6 justify-center items-center rounded-xl"
        >
          <img :src="FrownSvg" />
          <span
            class="font-inter font-semibold text-2xl text-[#450A0A] text-center"
            >Pouco satisfeito</span
          >
        </div>
        <div
          class="bg-[#FEF3C7] border border-[#FCD34D] px-20 py-24 flex flex-col gap-6 justify-center items-center rounded-xl"
        >
          <img :src="MehSvg" />
          <span
            class="font-inter font-semibold text-2xl text-[#451A03] text-center"
            >Satisfeito</span
          >
        </div>
        <div
          class="bg-[#D1FAE5] border border-[#6EE7B7] px-20 py-24 flex flex-col gap-6 justify-center items-center rounded-xl"
        >
          <img :src="SmileSvg" />
          <span
            class="font-inter font-semibold text-2xl text-[#022C22] text-center"
            >Muito satisfeito</span
          >
        </div>
      </div>
    </div>
  </AppLayout>
</template>
