import { firebaseApp } from '@/lib/firebase'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import VueKonva from 'vue-konva'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import { router } from './router'
import './styles/global.css'
import 'swiper/css'

import { createPinia } from 'pinia'
const app = createApp(App)

const vfm = createVfm()
const pinia = createPinia()

app
  .use(pinia)
  .use(vfm)
  .use(VueQueryPlugin)
  .use(router)
  .use(VueKonva)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .mount('#app')
