<template>
  <div class="transition-global">
    <div class="totemBG tw-bg-cover tw-w-full tw-h-screen customGrid">
      <div class="tw-text-center">
        <vBtnReset />
        <img
          src="@/assets/logo-white.svg"
          class="tw-w-2/5 tw-mx-auto tw-relative tw-py-10"
        />
      </div>
      <div class="tw-justify-center tw-items-center">
        <div
          class="
            tw-z-10
            tw-h-full
            tw-w-full
            tw-justify-center
            tw-items-center
            tw-flex
            tw-flex-wrap
          "
        >
          <div
            class="tw-w-full"
            v-for="(item, index) in getListaTipos"
            :key="index"
          >
            <div
              class="
                cardItem
                tw-mx-auto tw-p-6 tw-w-full tw-my-0 tw-cursor-pointer
              "
              :class="{ [item.customCSS]: true, desativado: !item.ativo }"
              @click="selectType(item.id, item.ativo)"
            >
              <div
                v-if="!item.ativo"
                class="
                  tw-p-2
                  tw-text-white
                  tw-font-bold
                  tw-text-xl
                  tw-inline-block
                  tw-absolute
                  tw-rounded
                  tw-border-4
                  tw-border-white
                "
              >
                Indisponível
              </div>
              <img class="cardImagem" :src="item.imagem" />
              <div class="tw-text-white tw-mt-8">
                <div class="tw-text-3xl tw-font-bold">
                  {{ item.nome }}
                </div>
                <div class="tw-text-3xl tw-font-normal tw-mt-3">
                  {{ item.descricao }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vTimeout :segundos="$root.getTimeoutName('TIPO_FOTO')" />
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import etapa from "@/constants/etapaCompra";
import { setEtapaCompra, setTypePhotoCompra } from "@/service/firebase";
import { getList /*tiposDeFotos*/ } from "@/constants/tipoFoto";

export default {
  data() {
    return {
      listaDeTipos: [],
    };
  },
  beforeMount() {
    this.listaDeTipos = getList();
    this.tratamentoListaFotos();
    console.log(this.listaDeTipos);
    setEtapaCompra(etapa.TIPO_FOTO).catch((err) => {
      console.log("Ocorreu um erro na hora de atualizar a etapa: ", err);
    });
  },
  mounted() {
    this.animaMounted();
  },
  computed: {
    getListaTipos() {
      return this.listaDeTipos;
    },
    getTotem() {
      return this.$store.getters["totem/getTotem"];
    },
  },
  methods: {
    markVerifyElement(item) {
      let cabineConfig = this.getTotem.config;
      if (item.id === "polaroid") {
        return cabineConfig.polaroid ? true : false;
      }
      if (item.id === "normal") {
        return cabineConfig.normal ? true : false;
      }
      if (item.id === "fotos_3x4") {
        return cabineConfig.fotos_3x4 ? true : false;
      }
    },
    tratamentoListaFotos() {
      this.listaDeTipos.forEach((element) => {
        const result = this.markVerifyElement(element);
        if (result) {
          element.ativo = true;
        } else {
          element.ativo = false;
        }
      });
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
    selectType(tipo, statusItem) {
      if (statusItem) {
        setTypePhotoCompra(tipo)
          .then(() => {
            this.$router.push("/cabine/selecione-qtd-foto");
          })
          .catch((err) => {
            console.log(
              "Ocorreu um erro na hora de selecionar o tipo de foto: ",
              err
            );
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.customGrid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
.transition-global {
  opacity: 0;
}
.cardItem {
  box-shadow: 0px 8px 8px rgba(140, 38, 101, 0.4);
  border-radius: 8px;
  width: 90%;
  image-rendering: optimizeQuality;
  text-rendering: optimizeLegibility;
  &.cardGradient1 {
    background: linear-gradient(180deg, #8876a1 0%, #222129 100%);
  }
  &.cardGradient2 {
    background: linear-gradient(180deg, #985d8f 0%, #1a191c 100%);
  }
  &.cardGradient3 {
    background: linear-gradient(180deg, #8876a1 0%, #1a191c 100%);
  }
  &.desativado {
    opacity: 0.5;
  }
  .cardImagem {
    width: 230px;
    image-rendering: optimizeQuality;
    @apply tw-mx-auto;
  }
  .cardDescricao {
    @apply tw-text-white;
  }
}
.totemBG {
  background-image: linear-gradient(
      180deg,
      #978fc4 0%,
      #a78ebd 34.84%,
      rgba(207, 138, 172, 0.8) 100%
    ),
    url("../../assets/fundo.png");
  background-size: cover;
}
</style>
