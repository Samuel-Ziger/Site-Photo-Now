<template>
  <div
    class="tw-w-48 tw-h-48 tw-flex-none tw-m-3 tw-text-center tw-items-center tw-flex"
    @click="$emit('eventClick')"
  >
    <canvas
      class="tw-hidden"
      :id="getIDCanvas"
      width="180"
      height="180"
    ></canvas>
    <div class="tw-grid">
      <img class="tw-rounded-xl" width="180" height="180" :src="imagemFixada" />
      <div
        class="tw-block tw-text-xl tw-text-white tw-font-light tw-uppercase tw-pt-2"
      >
        {{ filter | translateName }}
      </div>
    </div>
    <!--<div class="tw-hidden tw-mx-auto">
      <slot></slot>
    </div>-->
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  props: {
    fotoAtual: {
      required: false,
      type: Object,
    },
    filter: {
      required: true,
      type: String,
    },
  },
  filters: {
    translateName: function (name) {
      if (name == "semfiltro") return "Sem filtro";
      else return name;
    },
  },
  data() {
    return {
      imagemFixada: "",
    };
  },
  computed: {
    getIDCanvas() {
      return "canvas" + this.filter;
    },
  },
  beforeMount() {
    this.initFabricSmall();
  },
  methods: {
    createImageFixed() {
      //salvaCanvas(canvas, index) {
      this.imagemFixada = this.canvas.toDataURL("png");

      //this.createTaskUpload(url_ref_editada, imagemDataUrl);
    },
    genFilter() {
      //filtros internos do component
      var arrayToCanvas = [];
      if (this.filter == "Sepia") {
        let filtro = new fabric.Image.filters.Sepia();
        arrayToCanvas.push(filtro);
      }
      if (this.filter == "Grayscale") {
        let filtro = new fabric.Image.filters.Grayscale();
        arrayToCanvas.push(filtro);
      }
      if (this.filter == "Blur") {
        let filtro = new fabric.Image.filters.Blur({
          blur: 0.1,
        });
        arrayToCanvas.push(filtro);
      }
      if (this.filter == "OldTimes") {
        let filter1 = new fabric.Image.filters.Sepia();
        let filter2 = new fabric.Image.filters.Noise({
          noise: 70,
        });
        arrayToCanvas.push(filter1);
        arrayToCanvas.push(filter2);
      }
      if (this.filter == "Noise") {
        let filtro = new fabric.Image.filters.Noise({
          noise: 50,
        });
        arrayToCanvas.push(filtro);
      }
      if (this.filter == "Convolute") {
        let filtro = new fabric.Image.filters.Convolute({
          matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        });
        arrayToCanvas.push(filtro);
      }
      if (this.filter == "Vibrance") {
        let filtro = new fabric.Image.filters.Vibrance({
          vibrance: 1,
        });
        arrayToCanvas.push(filtro);
      }
      if (this.filter == "HueRotation") {
        let random = "0." + Math.round(Math.random() * 10);
        let filtro = new fabric.Image.filters.HueRotation({
          rotation: Number(random),
        });
        arrayToCanvas.push(filtro);
      }
      return arrayToCanvas;
    },
    gerarFotoNoCanvas() {
      let self = this;
      let canvasAtual = this.canvas;
      let resize = 180;
      fabric.Image.fromURL(
        `${self.fotoAtual.src}`,
        (img) => {
          img.set({
            left: 0,
            top: 0,
            interactive: false,
            selectable: false,
          });
          let renderFilter = self.genFilter();
          renderFilter.forEach((element) => {
            img.filters.push(element);
          });

          img.applyFilters();
          img.scaleToHeight(resize);
          canvasAtual.add(img);
          canvasAtual.renderAll();
          this.createImageFixed();
        },
        {
          crossOrigin: "Anonymous",
        }
      );
    },
    initFabricSmall() {
      //let self = this;
      let referenciaCanvas = "canvas" + this.filter;
      let canvasWidth = 180;
      let canvasHeight = 180;
      this.canvas = new fabric.Canvas(referenciaCanvas, {
        width: canvasWidth,
        height: canvasHeight,
        allowTouchScrolling: true,
        interactive: false,
      });
      /*document
        .querySelector(`#${referenciaCanvas}`)
        .addEventListener("click", self.$emit("eventClick"));*/
      this.gerarFotoNoCanvas();
    },
  },
  beforeDestroy() {
    /*
    //let referenciaCanvas = "canvas" + this.filter;
    //console.log(referenciaCanvas);
    
    document
      .querySelector(`#${referenciaCanvas}`)
      .removeEventListener("click", function () {});
      */
  },
};
</script>

<style></style>
