/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/config/env-config'
interface EventDataMap {
  'upload-started': null
  'upload-finished': null
}

type EventCallback<K extends keyof EventDataMap> = (
  data: EventDataMap[K]
) => void

export class WebSocketClient {
  private static instance: WebSocketClient | null = null
  private socket: WebSocket | null = null
  private token: string
  private eventListeners: Map<string, EventCallback<any>[]> = new Map()

  private constructor(token: string) {
    this.token = token
  }

  public static getInstance(token?: string): WebSocketClient {
    if (!WebSocketClient.instance && token) {
      WebSocketClient.instance = new WebSocketClient(token)
    }

    if (!WebSocketClient.instance) {
      throw new Error('WebSocketClient instance not initialized.')
    }

    return WebSocketClient.instance
  }

  public connect() {
    if (this.socket) {
      console.log('WebSocket connection already established.')
      return
    }

    const protocol = env.MODE === 'production' ? 'wss' : 'ws'
    const domain =
      env.MODE === 'production' ? 'site.photonow.com.br' : 'localhost:8080'
    const url = `${protocol}://${domain}/ws?token=${this.token}`

    this.socket = new WebSocket(url)

    this.socket.onopen = () => {
      console.log('WebSocket connection opened.')
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.handleEvent(message.event, message.data)
    }

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event)
      this.socket = null // Reset socket to allow reconnection
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  public sendMessage<K extends keyof EventDataMap>(message: {
    event: K
    data: EventDataMap[K]
  }) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message)
      this.socket.send(jsonMessage)
      console.log('Sent message:', jsonMessage)
    } else {
      console.error('WebSocket connection is not open.')
    }
  }

  public on<K extends keyof EventDataMap>(
    event: K,
    callback: EventCallback<K>
  ) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)?.push(callback as EventCallback<any>)
  }

  public off<K extends keyof EventDataMap>(
    event: K,
    callback: EventCallback<K>
  ) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      this.eventListeners.set(
        event,
        listeners.filter((cb) => cb !== callback)
      )
    }
  }

  private handleEvent<K extends keyof EventDataMap>(
    event: K,
    data: EventDataMap[K]
  ) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach((callback) => callback(data))
    }
  }
}
