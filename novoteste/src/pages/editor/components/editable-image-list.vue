<script setup lang="ts">
import { useEditorStore } from '@/store/editorStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

const editorStore = useEditorStore()

const orderItems = computed(() => editorStore.order?.orderItems || [])
const currentOrderItem = computed(() => editorStore.currentOrderItem)
</script>

<template>
  <swiper
    :slidesPerView="4"
    :spaceBetween="10"
    draggable="true"
    :pagination="{
      clickable: true,
    }"
  >
    <swiper-slide v-for="orderItem in orderItems" :key="orderItem.id">
      <div class="relative h-60 w-60">
        <img
          :src="orderItem.originalPictureUrl"
          class="w-full h-full rounded-lg object-cover"
          :class="{
            'border-[3px] border-[#fbcfe8]':
              currentOrderItem?.id === orderItem.id,
            'border-[3px] border-[#D4D4D4]':
              currentOrderItem?.id !== orderItem.id,
          }"
          loading="eager"
          @click="editorStore.setCurrentOrderItem(orderItem)"
        />
        <div
          v-if="currentOrderItem?.id === orderItem.id"
          class="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-[calc(100%-4px)] w-[calc(100%-3px)] rounded-lg border-[3px] border-[#EC4899]"
        ></div>
      </div>
    </swiper-slide>
  </swiper>
</template>
