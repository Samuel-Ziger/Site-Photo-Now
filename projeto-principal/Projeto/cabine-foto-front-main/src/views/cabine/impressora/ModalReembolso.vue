<template>
  <div>
    <vModalFull>
      <div class="tw-flex tw-w-full tw-h-full tw-items-center">
        <div class="tw-flex-1">
          <div class="tw-mx-10 tw-mb-20 tw-text-4xl">
            Infelizmente está dando um problema incomum.<br /><br />
            Tira uma foto no conteudo que está destacado e envie para esse
            <strong>Whatsapp {{ getWhatsappSuporte }}</strong>
          </div>
          <div
            class="
              tw-uppercase
              tw-pb-3
              tw-pt-5
              tw-border-2
              tw-border-gray-600
              tw-border-dashed
              tw-m-4
              tw-rounded-3xl
              tw-bg-white
              tw-text-black
              tw-mx-10
            "
          >
            <div class="tw-py-3 tw-text-center">
              <div class="tw-font-bold tw-text-3xl">Código da compra:</div>
              <div
                class="
                  tw-font-normal
                  tw-text-3xl
                  tw-my-2
                  tw-px-10
                  tw-py-5
                  tw-break-all
                  tw-normal-case
                  tw-text-gray-600
                "
              >
                {{ getCompra.id }}
              </div>
            </div>
            <div class="tw-grid tw-grid-cols-2 tw-text-center">
              <div class="tw-m-2">
                <div class="tw-font-bold tw-text-3xl">Data</div>
                <div
                  class="tw-font-normal tw-text-3xl tw-my-2 tw-text-gray-600"
                >
                  {{ getCompra.keep_alive | TRANSFORM_DATA }}
                </div>
              </div>
              <div class="tw-m-2">
                <div class="tw-font-bold tw-my-2 tw-text-3xl">Hora</div>
                <div
                  class="tw-font-normal tw-text-3xl tw-my-2 tw-text-gray-600"
                >
                  {{ getCompra.keep_alive | TRANSFORM_HORA }}
                </div>
              </div>
            </div>
            <div class="tw-grid tw-grid-cols-2 tw-text-center">
              <div class="tw-m-2">
                <div class="tw-font-bold tw-my-2 tw-text-3xl">Tipo de Foto</div>
                <div
                  class="tw-font-normal tw-text-3xl tw-my-2 tw-text-gray-600"
                >
                  {{ getCompra.tipo_foto }}
                </div>
              </div>
              <div class="tw-m-2">
                <div class="tw-font-bold tw-my-2 tw-text-3xl">Quantidade</div>
                <div
                  class="tw-font-normal tw-text-3xl tw-my-2 tw-text-gray-600"
                >
                  {{ getCompra.qtde_foto }}
                </div>
              </div>
            </div>
            <div class="tw-text-center tw-m-4">
              <div class="tw-font-bold tw-text-3xl">VALOR DA COMPRA:</div>
              <div class="tw-font-normal tw-text-3xl tw-py-2 tw-text-gray-600">
                {{ getCompra.valor | CURRENCY_ME }}
              </div>
            </div>
          </div>
          <div class="tw-text-center">
            <button
              @click="$emit('finalizar')"
              class="
                tw-bg-gray-900
                tw-text-white
                tw-rounded-lg
                tw-p-10
                tw-m-3
                tw-font-bold
                tw-w-4/6
                tw-text-4xl
                tw-mt-20
              "
            >
              <div>Já tirei a foto, finalizar</div>
            </button>
          </div>
        </div>
      </div>
    </vModalFull>
  </div>
</template>

<script>
import moment from "moment";
import vModalFull from "@/components/vModalFull";
export default {
  components: {
    vModalFull,
  },
  computed: {
    getCompra() {
      return this.$store.getters["compra/getCompra"];
    },
    getWhatsappSuporte() {
      return this.$store.getters["totem/getTotem"].config.suporteWhatsapp;
    },
  },
  filters: {
    CURRENCY_ME(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    TRANSFORM_HORA(value) {
      if (value) {
        let mountDate = value.toDate();
        return moment(mountDate).format("HH:MM:SS");
      } else {
        return "sem dados";
      }
    },
    TRANSFORM_DATA(value) {
      if (value) {
        let mountDate = value.toDate();
        return moment(mountDate).format("DD/MM/YYYY");
      } else {
        return "sem dados";
      }
    },
  },
};
</script>

<style></style>
