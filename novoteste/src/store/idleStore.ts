import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIdleStore = defineStore('idle', () => {
  const isIdle = ref(false)
  const isActive = ref(false)
  let timeoutId: number | null = null

  const startTimer = (resetTime: number) => {
    if (isActive.value) return

    isActive.value = true
    resetTimerInternal(resetTime)
    addEventListeners(resetTime)
  }

  const pauseTimer = () => {
    if (!isActive.value) return

    isActive.value = false
    clearTimeout(timeoutId as number)
    removeEventListeners()
  }

  const resetTimer = () => {
    isActive.value = false
    isIdle.value = false
    clearTimeout(timeoutId as number)
    removeEventListeners()
  }

  const resetTimerInternal = (resetTime: number) => {
    clearTimeout(timeoutId as number)
    timeoutId = window.setTimeout(() => {
      isIdle.value = true
      resetApplicationState()
    }, resetTime)
  }

  const resetApplicationState = () => {
    console.log('//TODO: revisar a função de resetTimer')
    // Adicione aqui o código para resetar a aplicação para o estado inicial
  }

  const addEventListeners = (resetTime: number) => {
    window.addEventListener('mousemove', () => resetTimerInternal(resetTime))
    window.addEventListener('keypress', () => resetTimerInternal(resetTime))
    window.addEventListener('scroll', () => resetTimerInternal(resetTime))
    window.addEventListener('click', () => resetTimerInternal(resetTime))
  }

  const removeEventListeners = () => {
    window.removeEventListener('mousemove', () => resetTimerInternal(0))
    window.removeEventListener('keypress', () => resetTimerInternal(0))
    window.removeEventListener('scroll', () => resetTimerInternal(0))
    window.removeEventListener('click', () => resetTimerInternal(0))
  }

  return {
    isIdle,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
  }
})
