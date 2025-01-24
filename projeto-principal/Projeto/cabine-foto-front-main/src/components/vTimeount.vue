<template>
  <div>
    <div v-if="modal">
      <!-- 
      <div
        id="fundo"
        class="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-z-40 tw-bg-black tw-bg-opacity-50"
      ></div>
    -->
      <vModalFull>
        <div
          class="
            tw-fixed
            tw-top-0
            tw-left-0
            tw-w-screen
            tw-h-screen
            tw-z-50
            tw-flex
            tw-items-center
            tw-justify-center
            tw-text-center
          "
        >
          <div class="tw-w-5/6 tw-p-8 tw-mx-auto tw-items-center">
            <div class="tw-font-semibold tw-text-5xl tw-text-center">
              {{ timecount }}
            </div>
            <div class="tw-text-4xl tw-my-10">Tem alguem ai ?</div>
            <div class="tw-p-5">
              <button
                class="
                  btnCustom
                  tw-p-10 tw-text-4xl tw-uppercase tw-rounded-2xl
                "
                @click="confirmarAtividade()"
              >
                SIM, ESTOU AQUI
              </button>
            </div>
          </div>
        </div>
      </vModalFull>
    </div>
  </div>
</template>

<script>
import timesheet from "@/constants/timeout_page";
import { setEtapaCompra, removeCodeFirebase } from "../service/firebase";
import etapaLabel from "@/constants/etapaCompra";
import vModalFull from "./vModalFull.vue";
export default {
  name: "vTimeout",
  components: {
    vModalFull,
  },
  props: {
    segundos: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      modal: false,
      userAtivo: false,
      timecount: 0,
      timeoutComponent: {},
      timeoutModal: {},
      timeoutRegressivo: {},
      timeoutName: "",
    };
  },
  mounted() {
    // ! disabled
    //this.timecount = timesheet.TIME_MODAL;
    //this.iniciaContagemDoComponent();
    //this.timeoutName = this.$store.getters["compra/getCompra"].etapa;
  },
  beforeDestroy() {
    clearTimeout(this.timeoutRegressivo);
    clearTimeout(this.timeoutModal);
    clearTimeout(this.timeoutComponent);
  },
  computed: {
    GET_AFK() {
      return this.$store.getters["totem/getAFK"];
    },
  },
  watch: {
    GET_AFK: function (val) {
      if (val === true) {
        if (!this.modal) {
          this.iniciarTudo();
        }
      } else {
        if (!this.modal) {
          this.destroiTimer();
        } else {
          //log("not > destroi timer");
        }
      }
    },
  },
  methods: {
    iniciarTudo() {
      this.timecount = timesheet.TIME_MODAL;
      this.iniciaContagemDoComponent();
      this.timeoutName = this.$store.getters["compra/getCompra"].etapa;
    },
    destroiTimer() {
      this.userAtivo = true;
      this.modal = false;
      this.timecount = timesheet.TIME_MODAL;
      clearTimeout(this.timeoutRegressivo);
      clearTimeout(this.timeoutModal);
      clearTimeout(this.timeoutComponent);
    },
    confirmarAtividade() {
      this.destroiTimer();
      /*this.userAtivo = true;
      this.modal = false;
      this.timecount = timesheet.TIME_MODAL;
      clearTimeout(this.timeoutRegressivo);
      clearTimeout(this.timeoutModal);
      this.iniciaContagemDoComponent();*/
    },
    timeModal() {
      if (this.timecount <= 0) {
        clearTimeout(this.timeoutRegressivo);
        this.expiraSessao();
        return false;
      }
      this.timecount -= 1;
      this.timeoutRegressivo = setTimeout(() => {
        if (!this.userAtivo) {
          clearTimeout(this.timeoutRegressivo);
          this.timeModal();
        } else {
          clearTimeout(this.timeoutRegressivo);
        }
      }, 1000);
    },
    expiraSessao() {
      this.timecount = timesheet.TIME_MODAL;
      this.modal = false;
      removeCodeFirebase();
      setEtapaCompra(etapaLabel.EXPIROU);
      this.$router.push("/cabine/home");
      clearTimeout(this.timeoutRegressivo);
      clearTimeout(this.timeoutModal);
    },
    iniciaContagemDoModal() {
      this.modal = true;
      let prod_time = timesheet.TIME_MODAL * 1000;
      this.timeModal();
      this.timeoutModal = setTimeout(() => {
        if (!this.userAtivo) {
          clearTimeout(this.timeoutModal);
          this.expiraSessao();
        } else {
          clearTimeout(this.timeoutModal);
        }
      }, prod_time);
    },
    iniciaContagemDoComponent() {
      //PRIMEIRO
      var prod_time = this.segundos * 1000;
      this.userAtivo = false;
      this.timeoutComponent = setTimeout(() => {
        clearTimeout(this.timeoutComponent);
        this.iniciaContagemDoModal();
      }, prod_time);
    },
  },
};
</script>

<style lang="scss" scoped>
.btnCustom {
  background-color: #988fc4;
}
</style>
