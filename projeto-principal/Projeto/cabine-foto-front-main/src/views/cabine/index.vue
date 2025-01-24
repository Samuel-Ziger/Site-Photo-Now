<template>
  <div>
    <vDevComponent />
    <router-view />
  </div>
</template>

<script>
import vDevComponent from "@/components/devToolsSolutions/index";
import { handleAuth } from "@/service/firebase";

export default {
  components: {
    vDevComponent,
  },
  data() {
    return {
      handleSnapCompra: {},
      handleGeradoToggle: false,
      inativoCount: 0,
      timer: null,
    };
  },
  beforeMount() {
    handleAuth();
  },
  mounted() {
    this.verifica_existeCompra();
    window.addEventListener("mousedown", this.resetTimer);
    window.addEventListener("mousemove", this.resetTimer);
    this.verifyInativo();
  },
  methods: {
    verifyInativo() {
      this.timer = setTimeout(() => {
        this.inativoCount += 1;
        if (this.inativoCount >= 5) {
          this.$store.commit("totem/setAFK", true);
          this.inativoCount = 5;
        }
        this.verifyInativo();
      }, 2000);
    },
    resetTimer() {
      this.inativoCount = 0;
      this.$store.commit("totem/setAFK", false);
    },
    verifica_existeCompra() {
      if (
        !this.$store.getters["compra/getCompra"].id ||
        this.$store.getters["compra/getCompra"].etapa == "EXPIROU"
      ) {
        this.$root.goto("/cabine/home");
      }
    },
    resetaCompra() {
      setTimeout(() => {
        this.$store.commit("compra/resetCompra");
        this.$router.push("/cabine/home");
        this.handleGeradoToggle = false;
        this.handleSnapCompra();
      });
    },
  },
};
</script>
