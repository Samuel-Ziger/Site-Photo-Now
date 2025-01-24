<template>
  <div>
    <div
      class="
        tw-pb-0
        tw-px-3
        tw-pt-3
        tw-text-white
        tw-text-2xl
        tw-text-left
        tw-font-normal
      "
    >
      Ferramenta de Texto
    </div>
    <div class="tw-text-center tw-py-3 tw-flex tw-items-center">
      <div class="tw-flex-1 tw-px-3">
        <input
          class="insert tw-text-lg"
          ref="input"
          v-model="inputText"
          @click="caretClick"
          placeholder="Novo texto"
        />
      </div>
      <div class="tw-flex-none tw-pr-3">
        <!-- tw-h-12 -->
        <button
          class="
            tw-px-8
            tw-py-3
            tw-justify-center
            tw-items-center
            tw-rounded
            tw-shadow
            tw-font-bold
            tw-fill-current
          "
          :class="{
            'tw-bg-gray-400': caseDisabledSend,
            'tw-bg-indigo-700': !caseDisabledSend,
          }"
          :disabled="caseDisabledSend"
          @click="acrescentarTexto()"
        >
          <v-icon color="white">mdi-send</v-icon>
        </button>
      </div>
    </div>
    <div class="simple-keyboard"></div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/brazilian.js";

export default {
  data() {
    return {
      instanciaKeyboard: null,
      inputText: null,
      currentCaret: 0,
      currentFont: "Pacifico",
      fonts: ["Satisfy", "Pacifico"],
    };
  },
  computed: {
    caseDisabledSend() {
      return this.inputText == "" || !this.inputText;
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    caretRemove() {
      this.currentCaret -= 1;
      this.instanciaKeyboard.setCaretPosition(this.currentCaret);
    },
    caretClick(e) {
      this.currentCaret = e.target.selectionStart;
      this.instanciaKeyboard.setCaretPosition(this.currentCaret);
    },
    acrescentarTexto() {
      if (this.inputText == "" || !this.inputText) {
        return false;
      }
      this.$emit("onCreateText", {
        font: this.currentFont,
        text: this.inputText,
      });
      this.inputText = "";
      this.currentCaret = 0;
      this.instanciaKeyboard.setInput("");
    },
    initialize() {
      let self = this;
      this.instanciaKeyboard = new Keyboard(
        {
          onChange: (input) => self.onChange(input),
          onKeyPress: (button) => self.onKeyPress(button),
          ...layout,
        },
        {
          buttonAttributes: [
            {
              attribute: "aria-label",
              value: "bee",
              buttons: "b B",
            },
          ],
          debug: true,
          disableCaretPositioning: true,
        }
      );
    },
    onChange(input) {
      // Já recebeu a modificação do caret do teclado.
      this.currentCaret = this.instanciaKeyboard.getCaretPosition();
      this.$refs.input.focus();
      this.inputText = input;
      this.instanciaKeyboard.setCaretPosition(this.currentCaret);
    },
    onKeyPress(button) {
      //antes de receber a modificação do caret
      if (this.currentCaret !== this.instanciaKeyboard.getCaretPosition()) {
        this.instanciaKeyboard.setCaretPosition(this.currentCaret);
      }
      if (button === "{shift}" || button === "{lock}") this.handleShift();
      if (button === "{backspace}") this.caretRemove();
    },
    handleShift() {
      let currentLayout = this.instanciaKeyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.instanciaKeyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Satisfy&display=swap");
.hg-theme-default {
  background-color: rgba(230, 230, 230, 0.9);
  border-radius: 0px;
  padding: 5px 10px;
}
</style>

<style lang="scss" scoped>
.insert {
  padding: 8px 20px;
  border-radius: 5px;
  outline: none;
  background-color: white;
  width: 100%;
  margin: 5px auto;
  justify-self: center;
  display: inline-block;
}
.input {
  display: none;
}
</style>
