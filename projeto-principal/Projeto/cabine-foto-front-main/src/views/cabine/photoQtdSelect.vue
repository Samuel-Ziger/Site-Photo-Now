<template>
  <div class="transition-global tw-h-screen totemBG">
    <div class="customGrid tw-h-5/6">
      <div class="tw-text-center">
        <vBtnReset />
        <img
          src="@/assets/logo-white.svg"
          class="tw-w-1/4 tw-mx-auto tw-relative tw-py-10 tw-pt-10"
        />
      </div>
      <div class="tw-text-center tw-text-white tw-text-3xl">
        <div class="tw-py-5">
          <div class="tw-font-bold tw-text-5xl">Quantidade e valor</div>
          <div class="tw-pt-5 tw-text-4xl tw-w-2/3 tw-mx-auto">
            Escolha a quantidade de imagens e o valor a ser pago
          </div>
        </div>
        <div class="tw-p-5 tw-mt-28" v-if="getList.length == 0">
          Infelizmente estamos sem preços desse tipo de foto, basta voltar e
          selecionar outro tipo.
        </div>
        <div class="outSizeContainList" v-else>
          <div class="containsTypeList scroll-modern">
            <div
              class="tw-w-full"
              :key="index"
              v-for="(item, index) in getList"
            >
              <div
                class="
                  tw-w-full
                  tw-items-center
                  tw-p-10
                  tw-text-white
                  tw-cursor-pointer
                  tw-font-normal
                  tw-text-3xl
                  tw-text-left
                  tw-rounded-xl
                  tw-transition-all
                  tw-duration-150
                  tw-transform
                "
                :class="{
                  'tw-opacity-100 gradientActiveItem tw-scale-105':
                    selectedItem == item,
                  'tw-opacity-60 gradientItem ': selectedItem != item,
                }"
                @click="selecionaItem(item)"
              >
                <div class="tw-pb-2">
                  <span class="tw-font-bold tw-mr-2">Fotos: </span>
                  {{ item.qtde_foto }}
                </div>
                <div class="tw-pt-2">
                  <span class="tw-font-bold tw-mr-2">Valor: </span
                  >{{ getPriceCurrency(item.valor) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vFloatguide
      :validNext="getPermissionNext"
      destinoNext="SCAN_QR_CODE"
      destinoBack="TIPO_FOTO"
    />
    <vTimeout :segundos="$root.getTimeoutName('QTDE_FOTO')" />
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
//import tipoFoto from "@/constants/tipoFoto";
//import { hasId, getList } from "@/constants/tipoFoto";
import etapa from "@/constants/etapaCompra";
import { setEtapaCompra, setQtdValorCompra } from "../../service/firebase";
import vFloatguide from "@/components/floatGuide";
export default {
  components: {
    vFloatguide,
  },
  data() {
    return {
      selectedItem: {},
      qtd: 0,
      precos: [],
      compra: {},
    };
  },
  beforeMount() {
    setEtapaCompra(etapa.QTDE_FOTO).catch((err) => {
      console.log("Ocorreu um erro na hora de atualizar a etapa: ", err);
    });
    this.compra = this.$store.getters["compra/getCompra"];
    let typePhoto = this.compra.tipo_foto;
    this.precos = this.$store.getters["precos/getPriceForType"](typePhoto);
  },
  computed: {
    getPermissionNext() {
      if (this.precos.length > 0 && this.selectedItem) {
        return true;
      } else {
        return false;
      }
    },
    getList() {
      return this.precos.filter((item, index) => {
        return index < 10;
      });
    },
  },
  mounted() {
    this.animaMounted();
    let compra = this.$store.getters["compra/getCompra"];
    let query = { valor: compra.valor, qtde_foto: compra.qtde_foto };
    this.selectedItem = this.getList.find((item) => {
      return item.valor === query.valor && item.qtde_foto === query.qtde_foto;
    });
  },
  methods: {
    selecionaItem(item) {
      this.selectedItem = item;
      this.selectQtd(item);
    },
    getPriceCurrency(valor) {
      let currency = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);
      return currency;
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
    selectQtd(preco) {
      let qtd = Number(preco.qtde_foto);
      let valor = Number(preco.valor);
      setQtdValorCompra(qtd, valor)
        .then(() => {})
        .catch((err) => {
          console.log(
            "Ocorreu um erro na hora de atualizar a qtd valor compra: ",
            err
          );
          alert("Ocorreu um erro na hora de atualizar a qtd valor compra");
          this.selectedItem = {};
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.outSizeContainList {
  @apply tw-bg-black tw-bg-opacity-10 tw-mt-10 tw-justify-center tw-items-center;
}
.containsTypeList {
  max-height: 840px;
  overflow-x: auto;
  @apply tw-grid tw-grid-cols-2 tw-gap-4 tw-p-5;
}
.scrollCustom {
  overflow-y: auto;
}
.gradientActiveItem {
  background: linear-gradient(180deg, #8c2667 0%, #222129 100%);
}
.gradientItem {
  background: linear-gradient(180deg, #8876a1 0%, #222129 100%);
}
.customGrid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
.groupitems {
  &::-webkit-scrollbar {
    width: 0px;
    opacity: 0;
  }
}
.transition-global {
  opacity: 0;
}
.totemBG {
  background-size: cover;
  background-image: linear-gradient(
      180deg,
      #978fc4 0%,
      #a78ebd 34.84%,
      rgba(207, 138, 172, 0.8) 100%
    ),
    url("../../assets/fundo.png");
}
</style>
