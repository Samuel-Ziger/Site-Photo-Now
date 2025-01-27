<template>
  <div class="transition-global">
    <div
      class="totemBG tw-bg-cover tw-w-screen tw-h-screen tw-flex tw-flex-row"
    >
      <div
        class="
          tw-flex-1
          tw-justify-center
          tw-items-center
          tw-self-center
          tw-place-items-center
        "
      >
        <div
          class="
            boxAgradecimento
            tw-w-5/6 tw-p-8 tw-rounded-xl tw-mx-auto tw-my-auto
          "
        >
          <div class="tw-object-center tw-text-center">
            <img
              class="
                tw-w-full
                tw-h-96
                tw-object-cover
                tw-object-top
                tw-rounded-xl
                tw-mx-auto
              "
              :src="getPhotoRandom()"
              alt=""
            />
          </div>
          <div>
            <div
              class="
                textHeader
                tw-font-light
                tw-text-center
                tw-text-pink-600
                tw-text-6xl
                tw-py-10
                tw-mt-8
              "
            >
              Tudo certo !
            </div>
            <div
              class="
                textBody
                tw-font-bold tw-text-gray-500 tw-mt-5 tw-text-4xl tw-text-center
              "
            >
              Agradecemos pela preferência!<br />
              Aproveite suas fotos =D
            </div>
            <div class="tw-py-5 tw-mt-8">
              <img class="tw-w-2/4 tw-mx-auto" src="@/assets/logo.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
export default {
  data() {
    return {
      randomGif: [
        {
          src: "https://media4.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif?cid=ecf05e478vx2523bgsl4j9kbnsvyiiwupe9qqzcarnwpjqde&rid=giphy.gif&ct=g",
        },
        {
          src: "https://media2.giphy.com/media/RQSuZfuylVNAY/giphy.gif?cid=ecf05e478vx2523bgsl4j9kbnsvyiiwupe9qqzcarnwpjqde&rid=giphy.gif&ct=g",
        },
        {
          src: "https://media1.giphy.com/media/dTJd5ygpxkzWo/giphy.gif?cid=ecf05e478vx2523bgsl4j9kbnsvyiiwupe9qqzcarnwpjqde&rid=giphy.gif&ct=g",
        },
        {
          src: "https://media2.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif?cid=ecf05e471yp3eve9vxvovh7yok94eafnp82f0aampj196hit&rid=giphy.gif&ct=g",
        },
        {
          src: "https://media0.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.webp?cid=ecf05e47hnxihl72vnwzqt5krgox27lfcoa9v6wu106lk97f&rid=giphy.webp&ct=g",
        },
        {
          src: "https://media0.giphy.com/media/v6aOjy0Qo1fIA/giphy.webp?cid=ecf05e47hnxihl72vnwzqt5krgox27lfcoa9v6wu106lk97f&rid=giphy.webp&ct=g",
        },
        {
          src: "https://media0.giphy.com/media/xThtadSLoInlcD1UmA/giphy.webp?cid=ecf05e47kjne03whc7jtw9rgz0y6hgwrdutkqla9qhwqgvcs&rid=giphy.webp&ct=g",
        },
        {
          src: "https://media1.giphy.com/media/uWlpPGquhGZNFzY90z/giphy.gif?cid=ecf05e477s1k33a026oxtmi5w9uqddau5lyl7e769yrs92iv&rid=giphy.gif&ct=g",
        },
        {
          src: "https://media2.giphy.com/media/ej4lfadivQe1W/giphy.webp?cid=ecf05e47ubwyfcixi2zo2f64dr606v3775y5s4tjs1dfwfrn&rid=giphy.webp&ct=g",
        },
        {
          src: "https://media0.giphy.com/media/RhrAmVUHxjTQvEPBWi/giphy.webp?cid=ecf05e47555eqcjgzgpom6e5tp46ggqsx75eyazmn4pwhcb8&rid=giphy.webp&ct=g",
        },
      ],
    };
  },
  mounted() {
    this.animaMounted();
    this.timeToReset();
  },
  methods: {
    IniciarTotem() {
      this.$store.commit("compra/resetCompra");
      this.$router.push("/cabine/home");
    },
    getPhotoRandom() {
      let randomID = Math.round(Math.random() * 9);
      let imagem = this.randomGif[randomID].src;
      console.log(imagem);
      return imagem;
    },
    timeToReset() {
      setTimeout(() => {
        this.$store.commit("compra/resetCompra");
        this.$router.push("/cabine/home");
      }, 10000);
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
.botaoCustom {
  background-color: #8c2667;
}
.boxAgradecimento {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(140, 38, 103, 0.8);
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
.transition-global {
  opacity: 0;
}
.textHeader {
  color: #8c2667;
}
.textBody {
  color: #8c2667;
}
</style>
