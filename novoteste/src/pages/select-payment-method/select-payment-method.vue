<script lang="ts" setup>
import PhotoNowLogo from '@/assets/logo.svg'
import SecondaryButton from '@/components/secondary-button.vue'
import { useGetOrder } from '@/composables/api/useGetOrder'
import { http } from '@/lib/axios'
import AppLayout from '@/pages/layouts/app-layout.vue'
import { Order } from '@/types'
import { CreditCard, QrCode } from 'lucide-vue-next'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrderTotal from './components/order-total.vue'
import PaymentMethodCard from './components/payment-method-card.vue'
import { useCompleteOrder } from '@/composables/api/useCompleteOrder'

const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)
const totemId = Number(route.params.totemId)
const order = ref<Order | null>(null)

const orderTotal = computed(() => {
  return parseFloat(order.value?.total ?? '0').toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
})

function toCardPayment() {
  router.push({
    name: 'waiting-card-payment',
    params: {
      totemId: String(totemId),
      orderId: String(orderId),
    },
  })
}

function toPixPayment() {
  router.push({
    name: 'waiting-pix-payment',
    params: {
      totemId: String(totemId),
      orderId: String(orderId),
    },
  })
}

async function selectPaymentMethod(paymentMethodId: number) {
  try {
    await http.post(`/totems/${totemId}/orders/${orderId}/payment-method`, {
      paymentMethodId,
    })
  } catch (error) {
    console.error(error)
  }
}

onBeforeMount(async () => {
  if (!orderId || orderId === -1 || !totemId || totemId === -1) {
    router.push({ name: 'not-found' })
    return
  }

  try {
    const response = await useGetOrder(totemId, orderId)

    if (!response.totem.isPaymentEnabled) {
      await useCompleteOrder({ totemId, orderId })

      router.push({
        name: 'survey',
        params: {
          totemId: response.totem.id,
          orderId: response.id,
        },
      })
      return
    }

    order.value = response
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <AppLayout>
    <header class="mb-8">
      <div class="flex items-center justify-center">
        <img :src="PhotoNowLogo" />
      </div>
    </header>

    <h1 class="text-center mb-10 text-2xl font-medium">
      Selecione uma forma de pagamento
    </h1>

    <div class="flex flex-col gap-2">
      <PaymentMethodCard
        description="Realize o pagamento escaneando o QR code e pagando via PIX."
        link="#"
        title="Pix"
        @click="
          async () => {
            await selectPaymentMethod(1)
            toPixPayment()
          }
        "
      >
        <template v-slot:icon>
          <CreditCard />
        </template>
      </PaymentMethodCard>

      <PaymentMethodCard
        description="Realize o pagamento através de um cartão de crédito mastercard ou visa."
        link="#"
        title="Cartão de crédito"
        @click="
          async () => {
            await selectPaymentMethod(2)
            toCardPayment()
          }
        "
      >
        <template v-slot:icon>
          <CreditCard />
        </template>
      </PaymentMethodCard>

      <PaymentMethodCard
        description="Realize o pagamento através de um cartão de débito mastercard ou visa."
        link="#"
        title="Cartão de débito"
        @click="
          async () => {
            await selectPaymentMethod(3)
            toCardPayment()
          }
        "
      >
        <template v-slot:icon>
          <QrCode />
        </template>
      </PaymentMethodCard>
    </div>

    <div class="mt-9">
      <OrderTotal :total="orderTotal" />
    </div>

    <div class="footer right-10">
      <SecondaryButton class="ml-auto">Voltar</SecondaryButton>
    </div>
  </AppLayout>
</template>
