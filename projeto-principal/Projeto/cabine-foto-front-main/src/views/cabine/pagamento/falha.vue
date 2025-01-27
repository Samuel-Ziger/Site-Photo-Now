<template>
  <div class="transition-global totemBG">
    <div class="tw-w-screen tw-h-screen">
      <div class="tw-text-center">
        <vBtnReset />
        <img
          src="@/assets/logo-white.svg"
          class="tw-w-2/5 tw-mx-auto tw-relative tw-pt-20"
        />
      </div>
      <div class="tw-p-8 tw-pt-10 tw-mt-10 tw-rounded-lg tw-mx-auto tw-my-auto">
        <div class="tw-object-center tw-text-center">
          <img
            class="tw-w-1/2 tw-mx-auto"
            src="@/assets/undraw_access_denied_re_awnf.svg"
          />
        </div>
        <div class="tw-py-16 tw-text-5xl tw-text-white tw-text-center">
          Ops... Algo deu errado!
        </div>
        <div>
          <div
            class="
              tw-text-5xl
              tw-text-white
              tw-text-center
              tw-font-light
              tw-mx-16
              tw-mb-20
            "
          >
            Não foi possível processar o seu pagamento.
          </div>
        </div>
        <div class="tw-text-center tw-mt-4">
          <div class="tw-py-2">
            <!-- TODO: modificar, o tentar novamente volta para o selectPagamento /pagamento-select -->
            <div>
              <button
                @click="tentarNovamente()"
                class="
                  tw-p-10 tw-w-5/6 tw-text-4xl tw-uppercase
                  btnAction
                  tw-rounded-3xl tw-font-bold
                "
              >
                Tentar novamente
              </button>
            </div>

            <div class="tw-mt-14">
              <button
                @click="tentarNovamente()"
                class="
                  tw-p-10
                  tw-w-5/6
                  tw-text-4xl
                  tw-uppercase
                  tw-rounded-3xl
                  tw-font-bold
                  tw-border-4
                  tw-border-white
                  tw-border-solid
                  tw-text-white
                "
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import { setEtapaCompra } from "../../../service/firebase";
export default {
  mounted() {
    this.animaMounted();
  },
  methods: {
    tentarNovamente() {
      let chapter = this.$root.chapters();
      setEtapaCompra(chapter.PAGAMENTO_SELECT);
    },
    animaMounted() {
      anime({
        targets: ".transition-global",
        opacity: {
          value: 1,
          delay: 0,
          duration: 1000,
          easing: "easeInOutExpo",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btnAction {
  background-color: #8c2667;
  color: white;
  border: 4px solid #8c2667;
}
.totemBG {
  background-size: cover;
  background-image: linear-gradient(
      180deg,
      #978fc4 0%,
      #a78ebd 34.84%,
      rgba(207, 138, 172, 0.8) 100%
    ),
    url("../../../assets/fundo.png");
}
.transition-global {
  opacity: 0;
}
.header-text {
  color: #3d5a80;
  font-size: 28px;
  line-height: 29px;
}
.textBody {
  color: #4a4a4a;
  font-family: "Roboto", sans-serif;
}
</style>
