<template>
  <div class="tw-top-0 tw-fixed tw-z-50" v-if="false">
    <div class="tw-font-bold tw-text-lg">DevToolsSolutions</div>
    <div class="tw-p-2">
      <div v-if="page == null">
        <button @click="page = 'fotoFind'"></button>
      </div>
      <div>
        <button @click="page = null"></button>
      </div>
    </div>
    <div>
      <div v-if="page == 'fotoFind'">
        <input type="text" v-model="compraID" /> <button>Buscar</button>
        <div>
          <div :key="index" v-for="(item, index) in lista">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lista: [],
      compraID: null,
      page: null,
      expanded: false,
    };
  },
  methods: {
    awesomePage(page) {
      this.lista = [];
      this.page = page;
    },
    removerFoto() {},
    buscarFotosId() {},
  },
};
</script>

<style></style>
