<script setup lang="ts">
import PrimaryButton from '@/components/primary-button.vue'
import SecondaryButton from '@/components/secondary-button.vue'
import { useSelectProduct } from '@/composables/api/useSelectProduct'
import { Product } from '@/types'
import { Minus, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { useRoute, useRouter } from 'vue-router'

interface PhotoQuantityModalProps {
  product: Product | null
}

const route = useRoute()
const router = useRouter()
const props = defineProps<PhotoQuantityModalProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()

const getInitialValues = () => ({
  teleportTo: 'body',
  modelValue: false,
  displayDirective: 'if' as const,
  hideOverlay: false,
  overlayTransition: 'vfm-fade',
  contentTransition: 'vfm-slide-up',
  clickToClose: true,
  escToClose: true,
  background: 'non-interactive' as const,
  lockScroll: true,
  reserveScrollBarGap: true,
  swipeToClose: 'none' as const,
})

const options = ref(getInitialValues())
const quantity = ref(1)

function close() {
  quantity.value = 1
  emit('update:modelValue', false)
}

function increment() {
  quantity.value += 1
}

function decrement() {
  if (quantity.value - 1 === 0) {
    return
  }

  quantity.value -= 1
}

async function handleConfirm() {
  const orderId = Number(route.params.orderId)
  const totemId = Number(route.params.totemId)

  if (!orderId) {
    console.error('Invalid order or totem id. Cannot select product.')
    return
  }

  const productId = props.product?.id ?? 0
  const q = quantity.value

  await useSelectProduct({
    orderId,
    quantity: q,
    productId: productId,
    totemId,
  })

  router.push(`/${totemId}/order/${orderId}/qr-code`)
}
</script>

<template>
  <VueFinalModal
    v-model="options.modelValue"
    :teleport-to="options.teleportTo"
    :display-directive="options.displayDirective"
    :hide-overlay="options.hideOverlay"
    :overlay-transition="options.overlayTransition"
    :content-transition="options.contentTransition"
    :click-to-close="options.clickToClose"
    :esc-to-close="options.escToClose"
    :background="options.background"
    :lock-scroll="options.lockScroll"
    :reserve-scroll-bar-gap="options.reserveScrollBarGap"
    :swipe-to-close="options.swipeToClose"
    class="confirm-modal"
    content-class="confirm-modal-content"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div class="relative text-center bg-white rounded-lg">
      <h1
        className="font-extrabold text-3xl p-6 text-[#DB2777] font-inter text-left"
      >
        Quantidade
      </h1>
      <p class="text-[#525252]">
        Selecione a quantidade de fotos que você deseja revelar.
      </p>
      <div>
        <div className="p-6 flex gap-6 justify-center items-center">
          <div>
            <PrimaryButton @click="decrement" class="p-7">
              <Minus :size="50" />
            </PrimaryButton>
          </div>
          <span class="text-7xl text-[#525252]">{{ quantity }}</span>
          <div>
            <PrimaryButton @click="increment" class="p-7">
              <Plus :size="50" />
            </PrimaryButton>
          </div>
        </div>
        <div className="px-6 flex items-center justify-end mb-6">
          <p className="text-2xl text-[#525252]">
            Valor:
            <span>{{
              Number((props.product?.price ?? 0) * quantity).toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                }
              )
            }}</span>
          </p>
        </div>
        <div className="h-[1px] w-full bg-[#D4D4D4]"></div>
        <div className="pt-3 flex justify-end items-center gap-x-2">
          <SecondaryButton @click="close" class="px-10 py-5">
            Cancelar
          </SecondaryButton>
          <PrimaryButton @click="handleConfirm" class="px-10 py-5">
            Comprar
          </PrimaryButton>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.confirm-modal-content {
  @apply max-w-xl w-9/12 mx-4 p-4  bg-white rounded-lg space-y-2;
}
.confirm-modal-content button {
  margin: 0;
}
</style>
