<script setup lang="ts">
import FollowTheMachineInstructionsSvg from '@/assets/follow-the-machine-instructions.svg'
import PhotoNowLogo from '@/assets/logo.svg'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Order } from '@/types'
import { useGetOrder } from '@/composables/api/useGetOrder'
import { useCompleteOrder } from '@/composables/api/useCompleteOrder'

const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)
const totemId = Number(route.params.totemId)
const order = ref<Order | null>(null)

async function handlerCreditPayment(amount: number) {
  fetch('http://localhost:9001/v1/pinpad/pagar', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'access-control-allow-origin': '*',
      'content-type': 'application/json;charset=UTF-8',
      'sec-ch-ua':
        '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify({ formaPagamento: 'Credito', valor: amount }),
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  })
    .then(async () => {
      await useCompleteOrder({ totemId, orderId })

      router.push({
        name: 'survey',
        params: {
          totemId: String(totemId),
          orderId: String(orderId),
        },
      })
    })
    .catch((error) => console.log('Credito error: ', error))
}

async function handlerDebitPayment(amount: number) {
  fetch('http://localhost:9001/v1/pinpad/pagar', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'access-control-allow-origin': '*',
      'content-type': 'application/json;charset=UTF-8',
      'sec-ch-ua':
        '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify({ formaPagamento: 'Debito', valor: amount }),
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  })
    .then(async () => {
      await useCompleteOrder({ totemId, orderId })

      router.push({
        name: 'survey',
        params: {
          totemId: String(totemId),
          orderId: String(orderId),
        },
      })
    })
    .catch((error) => console.log('Debit error: ', error))
}

onBeforeMount(async () => {
  const response = await useGetOrder(totemId, orderId)
  order.value = response
})

watch(
  () => order.value,
  (order) => {
    if (order?.paymentMethod) {
      switch (order.paymentMethod.code) {
        case 'CREDIT_CARD': {
          handlerCreditPayment(parseFloat(order.total))
          break
        }
        case 'DEBIT_CARD': {
          handlerDebitPayment(parseFloat(order.total))
          break
        }
      }
    }
  }
)

// fetch("http://localhost:9001/v1/pinpad/pagar", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
//     "access-control-allow-origin": "*",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"formaPagamento\":\"Credito\",\"valor\":12}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });

// fetch("http://localhost:9001/v1/pinpad/pagar", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
//     "access-control-allow-origin": "*",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"formaPagamento\":\"Debito\",\"valor\":12}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>

    <div class="flex justify-center items-center mt-48">
      <img :src="FollowTheMachineInstructionsSvg" />
    </div>

    <div class="flex flex-col justify-center items-center">
      <p class="text-center mt-10 text-2xl font-normal">
        Siga as instruções da máquina de
      </p>
      <p class="text-center text-2xl font-normal mb-3">
        cartão para finalizar sua compra
      </p>
    </div>
  </AppLayout>
</template>
