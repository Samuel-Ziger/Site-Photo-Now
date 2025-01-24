<template>
  <div class="transition-global">
    <div class="totemBG tw-bg-cover tw-w-screen tw-h-screen tw-flex">
      <div class="tw-p-0 tw-rounded-lg tw-mx-auto tw-my-auto tw-flex-1">
        <img class="tw-w-3/5 tw-mx-auto" src="@/assets/undraw_impressora.svg" />
        <div
          class="
            tw-text-5xl
            tw-font-bold
            tw-px-20
            tw-mb-10
            tw-my-20
            tw-text-white
            tw-py-5
            tw-text-center
          "
        >
          Suas fotos estão sendo reveladas!
        </div>
        <div class="tw-text-4xl tw-px-20 tw-text-white tw-text-center tw-mb-5">
          Em poucos minutos você terá um pouco da sua história em suas mãos.
        </div>
        <div class="tw-text-center tw-mt-20">
          <v-icon
            color="white"
            size="150"
            class="tw-mx-auto tw-inline-block tw-animate-spin"
            >mdi-loading</v-icon
          >
        </div>
      </div>
    </div>
    <!--
    <vErrorImpressao
      v-if="modalErroImpressao && !modalReembolso"
      :count="contagemErrosImpressao"
      @tentar-novamente="tentarNovamente"
      @reiniciar-totem="finalizarCompra"
    />-->
    <vModalErroImpressao
      v-if="modalErroImpressao && !modalReembolso"
      :contagem="contagemErrosImpressao"
      @close="tentarNovamente"
    />
    <vModalReembolso v-if="modalReembolso" @finalizar="finalizarCompra()" />
  </div>
</template>

<script>
import axios from "axios";
import anime from "animejs";
import { setEtapaCompra, db, registrarRibbon } from "@/service/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
//import vErrorImpressao from "./ErrorImpressao.vue";
import vModalReembolso from "./ModalReembolso.vue";
import vModalErroImpressao from "./ModalErroImpressao.vue";
import { storageInst } from "../../../service/firebase";
import { getDownloadURL, ref } from "@firebase/storage";
import { tiposDeFotos } from "@/constants/tipoFoto";
//import { runTransaction } from "firebase/firestore";

export default {
  components: {
    vModalErroImpressao,
    vModalReembolso,
  },
  data() {
    return {
      modalReembolso: false,
      modalErroImpressao: false,
      contagemErrosImpressao: 0,
      listaReferencias: [],
      listaImagens: [],
    };
  },
  beforeMount() {
    this.getReferencesImages();
  },
  mounted() {
    this.animaMounted();
  },
  methods: {
    ControladorDeErros() {
      this.contagemErrosImpressao++;
      if (this.contagemErrosImpressao > 5) {
        this.modalErroImpressao = false;
        this.modalReembolso = true;
        //d
      } else {
        this.modalErroImpressao = true;
        this.modalReembolso = false;
        //s
      }
    },
    finalizarCompra() {
      // fechar o modal e reiniciar o totem
      this.modalErroImpressao = false;
      this.contagemErrosImpressao = 0;
      this.$store.commit("compra/resetCompra");
      this.$router.push("/cabine/home");
    },
    tentarNovamente() {
      this.closeModal();
      setTimeout(() => {
        this.EnviarParaServiceImpressora();
      }, 1000);
    },
    closeModal() {
      this.modalErroImpressao = false;
    },
    async EnviarParaServiceImpressora() {
      let self = this;
      let tipoFoto = this.$store.getters["compra/getCompra"].tipo_foto;
      await axios
        .post("/v1/printer", {
          fotosUrl: self.listaImagens,
          tipo: tipoFoto.toUpperCase(),
        })
        .then(() => {
          this.setContadores();
          this.validaTerminoDaImpressao();
        })
        .catch((err) => {
          this.ControladorDeErros();
          console.error(err);
          this.$root.sendOneError(
            "Erro na impressora ao enviar a lista",
            "/v1/printer"
          );
        });
    },
    validaTerminoDaImpressao() {
      setTimeout(() => {
        setEtapaCompra(this.$root.chapters().AGRADECIMENTO);
      }, 10000);
    },
    getScopeFirebase(name) {
      //OBS: A ORDEM É IMPORTANTE [0],[1]
      //Operação [-],[+]
      console.log("GetScope", name);
      if (name == tiposDeFotos.POLAROID) {
        return [
          "countPolaroid",
          "countPolaroidTotal",
          "countPolaroidRibbon",
          "countPolaroidRibbonTotal",
        ];
      } else if (
        name == tiposDeFotos.NORMAL ||
        name == tiposDeFotos.FOTOS_3X4
      ) {
        return [
          "countNormal",
          "countNormalTotal",
          "countNormalRibbon",
          "countNormalRibbonTotal",
        ];
      } else {
        console.error("Contagem não pode ser efetuada");
        return false;
      }
    },
    async aplicaCalculo(scope, resultado, totemID) {
      // ! revisar resultado
      console.log("AplicaCalculo", scope, resultado);
      const nameSpaceFirebase = this.getScopeFirebase(scope);
      const referencia = doc(db, "totem", totemID);
      const nameCount = nameSpaceFirebase[0];
      const nameTotal = nameSpaceFirebase[1];
      const nameRibbonCount = nameSpaceFirebase[2];
      const nameRibbonCountTotal = nameSpaceFirebase[3];
      await setDoc(
        referencia,
        {
          contadores: {
            [nameCount]: resultado.count,
            [nameTotal]: resultado.total,
            [nameRibbonCount]: resultado.ribbonCount,
            [nameRibbonCountTotal]: resultado.ribbonTotal,
            //[nameRibbonCount]: resultado.
          },
        },
        { merge: true }
      )
        .then(() => {
          console.log("SUCESSO NO ENVIO DOS CALCULOS");
        })
        .catch((err) => {
          console.log("Erro ao tentar gravar calculo Normal: ", err);
        });
    },
    getFolhasImpressas() {
      const dadosCompra = this.$store.getters["compra/getCompra"];
      if (dadosCompra.foto_tipo === tiposDeFotos.POLAROID) {
        return Math.ceil(dadosCompra.qtde_foto / 2);
      } else {
        //todos os tipos menos POLAROID
        return dadosCompra.qtde_foto;
      }
    },
    pipelineRibonSetter(ribonResult) {
      console.log(ribonResult);
    },
    calculaRibon() {
      const count = this.getFolhasImpressas();
      registrarRibbon(count);
    },
    calculaValores() {
      console.log("INIT CalculaValores");
      const dadosCompra = this.$store.getters["compra/getCompra"];
      const dadosTotem = this.$store.getters["totem/getTotem"];
      const tipoFoto = dadosCompra.tipo_foto;
      console.log(tipoFoto);
      console.log(
        tiposDeFotos.POLAROID,
        tiposDeFotos.NORMAL,
        tiposDeFotos.FOTOS_3X4
      );
      if (tipoFoto == tiposDeFotos.POLAROID) {
        const quantidade = Number(dadosCompra.qtde_foto / 2);
        const totemCountTotal = dadosTotem.contadores.countPolaroidTotal;
        const totemCount = dadosTotem.contadores.countPolaroid;
        const totemCountRibbonTotal =
          dadosTotem.contadores.countPolaroidRibbonTotal;
        const totemCountRibbon = dadosTotem.contadores.countPolaroidRibbon;
        let resultadoPolaroid = {};
        resultadoPolaroid.count = totemCount - quantidade;
        resultadoPolaroid.total = totemCountTotal + quantidade;
        resultadoPolaroid.ribbonCount = totemCountRibbon
          ? totemCountRibbon - quantidade
          : 0;
        resultadoPolaroid.ribbonTotal = totemCountRibbonTotal
          ? totemCountRibbonTotal + quantidade
          : quantidade;
        this.aplicaCalculo("polaroid", resultadoPolaroid, dadosTotem.id);
      } else if (
        tipoFoto == tiposDeFotos.NORMAL ||
        tipoFoto === tiposDeFotos.FOTOS_3X4
      ) {
        const quantidade = Number(dadosCompra.qtde_foto);
        const totemCountTotal = dadosTotem.contadores.countNormalTotal;
        const totemCount = dadosTotem.contadores.countNormal;
        const totemCountRibbonTotal =
          dadosTotem.contadores.countNormalRibbonTotal;
        const totemCountRibbon = dadosTotem.contadores.countNormalRibbon;
        let resultadoNormal = {};
        resultadoNormal.count = totemCount - quantidade;
        resultadoNormal.total = totemCountTotal + quantidade;
        resultadoNormal.ribbonCount = totemCountRibbon
          ? totemCountRibbon - quantidade
          : 0;
        resultadoNormal.ribbonTotal = totemCountRibbonTotal
          ? totemCountRibbonTotal + quantidade
          : quantidade;
        this.aplicaCalculo("normal", resultadoNormal, dadosTotem.id);
      } else {
        console.error("ERROR|calculaValores: NENHUM DOS CASOS DE TIPO DE FOTO");
      }
      //this.calculaRibon();
    },
    async setContadores() {
      // ! PROCESSO PODERIA SER FEITO NO FINAL;
      this.calculaValores();
      /*if (compraTipo === tiposDeFotos.POLAROID) {
        
      }
      if (compraTipo == "polaroid" || compraTipo == "normal") {
        
      }*/
      // * SEM NECESSIDADE.
      /*if (Compra.tipo_foto !== "normal" && Compra.tipo_foto == "polaroid") {
        throw new Error("tipo_foto invalida na função  set_Contadores!");
      }*/
    },
    async BuscarUrlDoFirebaseStorage() {
      let self = this;
      let contagem = 0;
      this.listaReferencias.forEach(async (item) => {
        // ! DEV REFATORAR PARA NOVA VERSÃO URGENTE & testar.
        //let referenciaQuery = ref(storage)
        let itemRefStorage = ref(storageInst, `${item.url_editada}`);
        getDownloadURL(itemRefStorage)
          .then((url) => {
            contagem++;
            self.listaImagens.push(url);
            if (contagem == this.listaReferencias.length) {
              self.EnviarParaServiceImpressora();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    async getReferencesImages() {
      // ! DEV TESTAR
      let self = this;
      let compra = this.$store.getters["compra/getCompra"];
      let fotosRef = collection(db, "fotos");
      let searchQuery = query(
        fotosRef,
        where("compra_id", "==", `${compra.id}`)
      );
      let querySnaps = await getDocs(searchQuery);
      console.log(querySnaps);
      querySnaps.forEach((doc) => {
        let bin = doc.data();
        let forgeObj = {
          id: doc.id,
          url_editada: bin.url_editada,
          url_original: bin.url_original,
          compra_id: bin.compra_id,
        };
        self.listaReferencias.push(forgeObj);
      });
      this.$nextTick(() => {
        this.BuscarUrlDoFirebaseStorage();
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
  },
};
</script>

<style lang="scss" scoped>
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
