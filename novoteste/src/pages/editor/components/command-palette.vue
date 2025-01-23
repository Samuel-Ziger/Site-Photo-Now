<script setup lang="ts">
import { Image, Smile, Type } from 'lucide-vue-next'

const defaultSize = 32
</script>

<template>
  <ul class="flex flex-col justify-center items-center gap-y-6">
    <!-- <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <Sparkles color="#737373" :size="defaultSize" />
      </button>
    </li> -->
    <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <Smile color="#737373" :size="defaultSize" />
      </button>
    </li>
    <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <Type color="#737373" :size="defaultSize" />
      </button>
    </li>
    <!-- <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <Sun color="#737373" :size="defaultSize" />
      </button>
    </li> -->
    <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <Image color="#737373" :size="defaultSize" />
      </button>
    </li>
    <!-- <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <RefreshCcw color="#737373" :size="defaultSize" />
      </button>
    </li>
    <li>
      <button class="border border-[#D4D4D4] rounded-full p-3">
        <Crop color="#737373" :size="defaultSize" />
      </button>
    </li> -->
  </ul>
</template>
