<template>
  <div
    class="
      tw-w-screen tw-h-screen tw-flex tw-items-center tw-text-center
      totemBG
    "
  >
    <div class="tw-w-2/3 tw-text-center tw-flex-1 tw-text-white">
      <div class="tw-mb-10">
        <img
          class="
            tw-mx-auto
            tw-w-1/2
            tw-rounded-3xl
            tw-border-8
            tw-border-white
            tw-border-solid
          "
          :src="selectItem"
        />
      </div>
      <div class="tw-text-5xl tw-font-bold">Cabine em manutenção!</div>
      <div class="tw-text-4xl tw-mt-10 tw-w-5/6 tw-mx-auto">
        Estamos trabalhando o mais rápido para resolver o problema.
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/service/firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

export default {
  data() {
    return {
      selectItem: null,
      listaImagens: [
        "https://media0.giphy.com/media/PkVHsFmmLeBfa/giphy.gif?cid=ecf05e47hod7qpcvj6zxwl3b6mwvlycpx6tjyv5q4272naua&rid=giphy.gif&ct=g",
        "https://media2.giphy.com/media/J2tNIOLEHELkY/giphy.gif?cid=ecf05e47efn998gpynzybve3au8vq15q1yckgzha0mm9o909&rid=giphy.gif&ct=g",
        "https://media3.giphy.com/media/2IodXMfbcVVrW/giphy.gif?cid=ecf05e47cvlhoj9m5ugmxniiyz8qryh5dke3391sfeglwk6v&rid=giphy.gif&ct=g",
      ],
      totemHandle: function () {},
    };
  },
  mounted() {
    this.initCicleImage();
    this.ouvirFirebaseTotem();
  },
  beforeDestroy() {
    this.totemHandle();
  },
  methods: {
    ouvirFirebaseTotem() {
      let token = this.$store.getters["totem/getToken"];
      let docRef = doc(db, "totem", `${token}`);
      this.totemHandle = onSnapshot(docRef, (doc) => {
        let manutencao = doc.data().config.manutencao;
        if (!manutencao) {
          this.$router.push("/cabine/home");
        }
      });
    },
    initCicleImage() {
      let quantidadeImagens = this.listaImagens.length;
      let randomIndex = Math.round(Math.random() * quantidadeImagens);
      if (randomIndex > 0) randomIndex--;
      this.selectItem = this.listaImagens[randomIndex];
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
    url("../../assets/fundo.png");
}
</style>
