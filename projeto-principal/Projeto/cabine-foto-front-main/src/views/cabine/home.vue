<template>
  <div class="animeAllBG tw-flex">
    <div class="totemBG tw-bg-cover tw-w-full tw-h-full tw-absolute">
      <div
        class="gradientCustom tw-w-full tw-h-full tw-opacity-50 tw-z-0 tw-absolute"
      ></div>
      <div
        class="tw-z-10 tw-h-full tw-w-full tw-relative tw-flex animate__animated animate__bounce animate__slow animate__infinite"
      >
        <div @click="callFirebase()" class="animeBtnHome btnInit">
          <div class="customBorder">
            <div class="containClickStrict primeiro">Clique</div>
            <div class="containClickStrict segundo">aqui para</div>
            <div class="containClickStrict terceiro">imprimir</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { loadPrecos, iniciarCompra } from "@/service/firebase";
import { getDoc, doc, onSnapshot } from "@firebase/firestore";
import { db } from "@/service/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storageMolduras } from "../../service/firebase";
//import etapa from "@/constants/etapaCompra";

export default {
  data() {
    return {
      totemHandle: function () {},
    };
  },
  beforeDestroy() {
    this.totemHandle();
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async carregaFirestoreMoldura() {
      let moldurasVuex = this.$store.getters["molduras/getMolduras"];
      if (moldurasVuex && moldurasVuex.length > 0) {
        return;
      }
      let referencia = collection(db, "molduras");
      let molduras = await getDocs(referencia);
      const array = [];
      await molduras.forEach(async (item) => {
        if (item && item.data().ativo) {
          let itemData = item.data();
          let referencia = ref(storageMolduras, itemData.referenciaStorage);
          let url = await getDownloadURL(referencia);
          var img = document.createElement("img");
          img.className =
            "tw-select-none tw-w-80 tw-h-64 tw-rounded-md tw-bg-cover tw-object-contain";
          img.src = url;
          array.push({
            ...itemData,
            imagem: img,
          });
        }
      });
      this.$store.commit("molduras/setMolduras", array);
    },
    async initialize() {
      await this.ouvirFirebaseTotem();
      await loadPrecos();
      await this.carregaFirestoreMoldura();
      if (process.env.VUE_APP_ENV === "development") {
        // ! Atenção nesse ponto qualquer fluxo feito no totem será postado no TOTEM_ID setado no main.js como mockado.
        //this.$root.mockmode(etapa.TIPO_FOTO);
      }
    },
    async ouvirFirebaseTotem() {
      let token = this.$store.getters["totem/getToken"];
      if (token) {
        let docRef = doc(db, "totem", `${token}`);
        this.totemHandle = onSnapshot(docRef, (doc) => {
          let payloadData = doc.data();
          if (payloadData && payloadData.config) {
            if (payloadData.config.manutencao) {
              console.warn("EM MANUTENCAO");
              this.$router.push("/manutencao");
            } else {
              this.$store.commit("totem/setTotem", payloadData);
            }
          } else {
            // nada
          }
        });
      } else {
        setTimeout(() => {
          this.ouvirFirebaseTotem();
        }, 1000);
      }
    },
    async carregaDadosTotem() {
      // PROBLEMA APONTADO
      const totemKEY = this.$store.getters["totem/getToken"];
      const docRef = doc(db, "totem", totemKEY);
      let docSnap = await getDoc(docRef);
      let payload = docSnap.data();
      this.$store.commit("totem/setTotem", payload);
      if (payload && payload.config) {
        if (payload.config.manutencao) {
          this.$router.push("/manutencao");
        }
      } else {
        setTimeout(() => {
          this.carregaDadosTotem();
        }, 1000);
      }
    },
    callFirebase() {
      iniciarCompra(
        () => {
          this.animeBtn();
          this.$root.CreatListenerPurchase();
        },
        () => {
          console.error("erro ao iniciar uma compra");
        }
      );
    },
    animeBtn() {
      var animation = anime({
        targets: ".animeBtnHome",
        scale: {
          value: 1.3,
          delay: 50,
          duration: 500,
        },
        opacity: {
          value: 0,
          delay: 100,
          duration: 500,
          easing: "easeInOutExpo",
        },
      });
      animation.finished.then(() => {
        this.animeFundo();
      });
    },
    animeFundo() {
      anime({
        targets: ".animeAllBG",
        opacity: {
          value: 0,
          duration: 200,
          easing: "easeInOutExpo",
        },
      });
    },
    callInitialCabine() {
      this.animeBtn();
    },
  },
};
</script>

<style lang="scss" scoped>
.btnInit {
  @apply tw-cursor-pointer tw-bg-white tw-shadow-lg tw-flex tw-items-center tw-justify-center tw-w-96 tw-h-96 tw-p-3 tw-rounded-full tw-mx-auto tw-my-auto tw-bg-opacity-80;
}

.customBorder {
  border-color: #98a1bb;
  border-width: 1px;
  border-spacing: 30px;
  @apply tw-border-dashed tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-full tw-border-gray-400;
}

.containClickStrict {
  @apply tw-py-5 tw-px-12 tw-text-5xl tw-text-white;

  &.primeiro {
    background-color: #40082c;
    transform: rotate(3deg);
  }

  &.segundo {
    transform: rotate(5deg);
    background-color: #d91a83;
  }

  &.terceiro {
    background-color: #bf99ae;
    padding: 20px;
  }
}

//
.totemBG {
  background-image: url("../../assets/fundo.png");
}

.gradientCustom {
  background: linear-gradient(
    135.68deg,
    #4f5bd5 1.9%,
    #962fbf 36.17%,
    #d62976 81.87%,
    #feda75 128.53%,
    #fa7e1e 181.84%
  );
}
</style>
