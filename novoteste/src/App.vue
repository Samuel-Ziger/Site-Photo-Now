<script setup lang="ts">
import IdleDetectionModal from '@/components/Idle-detection-modal.vue'
import { env } from '@/config/env-config'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { ref } from 'vue'
import { ModalsContainer } from 'vue-final-modal'
import { useRoute } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const route = useRoute()
const showQueryDevtools = env.MODE === 'development'

const anim = ref('grow-in')

// fade
// slide
// slide-down
// grow-in
// grow-out
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="anim" mode="out-in">
      <Component :is="Component" />
    </transition>
  </router-view>
  <ModalsContainer />
  <VueQueryDevtools v-if="showQueryDevtools" />
  <IdleDetectionModal v-if="route.name !== 'start'" />
</template>

<style>


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(300px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: 0.3s ease-out;
}

.grow-in-enter-from,
.grow-in-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.grow-in-enter-active,
.grow-in-leave-active {
  transition: 0.3s ease-out;
}

.grow-out-enter-from,
.grow-out-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.grow-out-enter-active,
.grow-out-leave-active {
  transition: 0.3s ease-out;
}
</style>
