<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const modules = [Autoplay]
</script>

<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    :loop="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :modules="modules"
    class="flex-auto h-[86%] p-10"
  >
    <swiper-slide>
      <div
        class="border-dashed border-2 w-full h-full flex items-center justify-center"
      >
        <span class="text-9xl font-bold text-[#FBCFE8]"> 1 </span>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div
        class="border-dashed border-2 w-full h-full flex items-center justify-center"
      >
        <span class="text-9xl font-bold text-[#FBCFE8]"> 2 </span>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div
        class="border-dashed border-2 w-full h-full flex items-center justify-center"
      >
        <span class="text-9xl font-bold text-[#FBCFE8]"> 3 </span>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div
        class="border-dashed border-2 w-full h-full flex items-center justify-center"
      >
        <span class="text-9xl font-bold text-[#FBCFE8]"> 4 </span>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div
        class="border-dashed border-2 w-full h-full flex items-center justify-center"
      >
        <span class="text-9xl font-bold text-[#FBCFE8]"> 5 </span>
      </div>
    </swiper-slide>
  </swiper>
</template>
