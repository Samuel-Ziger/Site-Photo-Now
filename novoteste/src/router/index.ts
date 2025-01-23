import { createRouter, createWebHistory } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import NotFoundView from '@/pages/404.vue'
import InternalErrorView from '@/pages/500.vue'
import CpfOnInvoiceView from '@/pages/cpf-on-invoice/cpf-on-invoice.vue'
import EditorView from '@/pages/editor/editor.vue'
import MaintenanceView from '@/pages/maintenance.vue'
import PaymentSuccessView from '@/pages/payment-success/payment-success.vue'
import PhoneOnInvoiceView from '@/pages/phone-on-invoice/phone-on-invoice.vue'
import ProductSelectionView from '@/pages/product-selection/product-selection.vue'
import QrCodeView from '@/pages/qr-code/qr-code.vue'
import SelectPaymenthMethodView from '@/pages/select-payment-method/select-payment-method.vue'
import StartView from '@/pages/start/start.vue'
import SurveyView from '@/pages/survey/survey.vue'
import WaitingCardPaymentView from '@/pages/waiting-card-payment/waiting-card-payment.vue'
import WaitingPixPaymentView from '@/pages/waiting-pix-payment/waiting-pix-payment.vue'

const routes = [
  {
    name: 'start',
    path: '/:totemId/start',
    component: StartView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'product-selection',
    path: '/:totemId/order/:orderId/product-selection',
    component: ProductSelectionView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'qr-code',
    path: '/:totemId/order/:orderId/qr-code',
    component: QrCodeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'editor',
    path: '/:totemId/order/:orderId/editor',
    component: EditorView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'select-payment-method',
    path: '/:totemId/order/:orderId/select-payment-method',
    component: SelectPaymenthMethodView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'cpf-on-invoice',
    path: '/:totemId/order/:orderId/cpf-on-invoice',
    component: CpfOnInvoiceView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'phone-on-invoice',
    path: '/:totemId/order/:orderId/phone-on-invoice',
    component: PhoneOnInvoiceView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'waiting-card-payment',
    path: '/:totemId/order/:orderId/waiting-card-payment',
    component: WaitingCardPaymentView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'waiting-pix-payment',
    path: '/:totemId/order/:orderId/waiting-pix-payment',
    component: WaitingPixPaymentView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'payment-success',
    path: '/:totemId/order/:orderId/payment-success',
    component: PaymentSuccessView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'survey',
    path: '/:totemId/order/:orderId/survey',
    component: SurveyView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'global-not-found',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
  {
    name: 'not-found',
    path: '/404',
    component: NotFoundView,
  },
  {
    name: 'internal-error',
    path: '/500',
    component: InternalErrorView,
  },
  {
    name: 'maintenance',
    path: '/maintenance',
    component: MaintenanceView,
  },
  {
    name: 'login',
    path: '/:totemId/login',
    component: () => import('@/pages/login/login.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && to.name !== 'login' && !isAuthenticated.value) {
    next('login')
  } else {
    next()
  }

})
