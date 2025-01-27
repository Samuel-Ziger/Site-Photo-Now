<template>
  <div
    class="tw-flex tw-h-screen tw-w-screen tw-justify-center tw-items-center"
  >
    <div class="tw--mt-10">
      <div class="tw-text-center tw-py-2">
        <svg
          fill="none"
          class="tw-w-16 tw-h-16 tw-mx-auto tw-animate-spin tw-text-gray-300"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <div class="tw-p-0 tw-text-gray-700 tw-text-lg tw-text-center">
        Inicializando o totem...
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";
import { auth, db, loadPrecos } from "@/service/firebase";

export default {
  beforeMount() {
    this.signoutUser();
  },
  methods: {
    signoutUser() {
      signOut(auth)
        .then(() => {
          this.validaExistenciaDoID();
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/404");
        });
    },
    async validaExistenciaDoID() {
      var parametroID = this.$route.params.id;
      if (parametroID) {
        //teste
        const referencia = doc(db, "totem", parametroID);
        const docSnap = await getDoc(referencia);
        if (docSnap.exists()) {
          this.authenticaUser();
        } else {
          this.$router.push("/404");
        }
      } else {
        this.$router.push("/404");
      }
    },
    async carregaTotem() {
      const tokenParam = this.$route.params.id;
      const docRef = doc(db, "totem", tokenParam);
      const docSnap = await getDoc(docRef);
      const payload = docSnap.data();
      if (!this.verificaConfig(payload)) {
        this.$router.push("/error-config");
        return false;
      }
      this.$store.commit("totem/setToken", tokenParam);
      this.$store.commit("totem/setTotem", payload);
      loadPrecos();
      this.ParaHomeTotem();
    },
    verificaConfig(bin) {
      if (!bin.config.polaroid && !bin.config.normal) {
        this.$root.errorConfig(
          "Nenhuma impressora definida no administrativo",
          false
        );
        return false;
      } else {
        return true;
      }
    },
    ParaHomeTotem() {
      this.$router.push("/cabine/home");
    },
    authenticaUser() {
      let uEmail = "totem@totem.com.br";
      let uPass = "123456";
      signInWithEmailAndPassword(auth, uEmail, uPass)
        .then(() => {
          this.carregaTotem();
        })
        .catch((err) => {
          alert(err.code);
          this.$root.errorConfig(
            "Problema de autenticação, comunicar ao suporte imediatamente",
            true
          );
        });
    },
  },
};
</script>
