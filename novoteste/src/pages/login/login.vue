<script lang="ts" setup>
import { useLogin } from '@/composables/api/useLogin'
import { http } from '@/lib/axios'
import { WebSocketClient } from '@/lib/websocket'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import PhotoNowLogo from '@/assets/logo_2.svg'

const router = useRouter()
const identifier = ref('user1_totem_identifier')
const password = ref('Mudar@123')
const jwtAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInJvbGUiOiJ0ZXN0ZXIiLCJleHAiOjQ3MjM2NDgwMDB9.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'

async function handleLogin(event: Event) {
  event.preventDefault()
  try {
    const response = await useLogin({
      identifier: identifier.value,
      password: password.value,
    })

    //const { accessToken, totem } = response
    const { totem } = response

    http.defaults.headers.common.Authorization = `Bearer ${jwtAccessToken}`
    localStorage.setItem('accessToken', jwtAccessToken)
    const client = WebSocketClient.getInstance(jwtAccessToken)
    client.connect()
    router.push({ name: 'start', params: { totemId: totem.id } })
  } catch (error) {
    console.error('Erro ao realizar login:', error)
  }
}
</script>

<style>
.section-login {
  margin-top: 80px;
  margin-bottom: 80px;

  .section-login-logos {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;

    img {
      width: 195px;
      max-width: 100%;
    }
  }
}
</style>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-8">
        <div class="section-login">
          <div class="section-login-logos">
            <img style="max-height: 80px" :src="PhotoNowLogo" />
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">
                <h6>Acessar Totem</h6>
              </div>
            </div>
            <div class="card-body">
              <div class="card-body-form">
                <form @submit="handleLogin">
                  <div class="form-group">
                    <label for="username">Nome de usuário</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="john.snow"
                      name="username"
                      v-model="identifier"
                    />
                  </div>

                  <div class="form-group">
                    <label for="password-field">Senha</label>
                    <input
                      id="password-field"
                      type="password"
                      class="form-control"
                      name="password"
                      v-model="password"
                    />
                  </div>

                  <div class="form-group" style="margin-bottom: 0px">
                    <button type="submit" class="btn btn-primary">
                      Acessar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
