<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="fixScreen totemBG">
    <div class="tw-bg-black tw-bg-opacity-10 tw-h-full">
      <vBtnReset />
      <vTimeout :segundos="$root.getTimeoutName('EDICAO')" />
      <div class="tw-p-4">
        <div class="tw-text-center">
          <img src="@/assets/logo-white.svg" class="tw-w-56 tw-mx-auto" />
        </div>
      </div>
      <div id="canvasContain" class="tw-text-center tw-object-center">
        <div class="tw-inline-block tw-mx-auto tw-mt-1">
          <div :key="index" v-for="(canv, index) in listaReferencias">
            <div
              v-show="indexAtualDaFoto == index"
              class="tw-p-0 tw-shadow-md tw-transform tw-relative"
              :class="{
                'tw-p-5 tw-pb-16 tw-bg-white': tipo == 'polaroid',
              }"
            >
              <canvas :id="'canvas' + index" class="tw-mx-auto"></canvas>
            </div>
            <!-- <p
              v-if="tipo && tipo === 'normal'"
              class="tw-text-white tw-text-center tw-text-xl tw-w-80 tw-mx-auto tw-mt-2 animate-pulse"
            >
              Não esqueça de ajustar o enquadramento da foto! 😊
            </p> -->
             
            <div class="tw-relative" v-show="indexAtualDaFoto == index">
              <div
                v-if="tipo && tipo === 'normal'"
                class="tw-absolute"
                :style="{ left: '-1rem', transform: 'translate(-20%, 61%)' }"
                @click="rotateImagem('left')"
              >
                <button
                  type="button"
                  class="tw-bg-white tw-p-2 tw-rounded-full tw-bottom-0"
                  
                >
                  <v-icon color="#da1884" size="32">mdi-rotate-left</v-icon>
                  Girar foto para esquerda
                </button>
              </div>
              <button
                class="btnZera"
                :disabled="toggleResetOriginal"
                @click="zeraUpdateDoCanvasAtual()"
              >
                <v-icon
                  :class="{ 'tw-animate-spin': toggleResetOriginal }"
                  style="image-rendering: optimizeQuality"
                  color="red"
                  size="30"
                  >mdi-restart</v-icon
                >
                Desfazer tudo
              </button>
              <div
                v-if="tipo && tipo === 'normal'"
                class="tw-absolute"
                :style="{ left: '-1rem', transform: 'translate(234%, -123%)' }"
                @click="rotateImagem('right')"
              >
                <button
                  type="button"
                  class="tw-bg-white tw-p-2 tw-rounded-full tw-bottom-0"
                  
                >
                  Girar foto para direita
                  <v-icon color="#da1884" size="32">mdi-rotate-right</v-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="gallery"
        class="tw-flex tw-my-5 tw-overflow-x-auto tw-bg-opacity-20 tw-p-4 tw-bg-gray-100 scroll-modern"
      >
        <div
          :key="index"
          v-for="(item, index) in listaImagens"
          class="tw-flex-none tw-inline-block tw-break-words tw-ml-4"
        >
          <div
            class="tw-py-5 tw-bg-white tw-rounded-xl tw-bg-opacity-30"
            @click="selecionaCanvas(index)"
          >
            <img
              class="tw-select-none tw-w-80 tw-h-64 tw-rounded-md tw-bg-cover tw-object-contain"
              :src="item.src"
            />
          </div>
        </div>
      </div>
      <div id="menuBottom" class="menuBottom">
        <div
          id="openMENU"
          class="tw-py-2"
          style="min-height: 400px"
          v-if="mountView !== ''"
        >
          <div
            class="tw-text-right tw-p-2 tw-absolute tw--mt-10 tw-right-4 tw-bg-black tw-bg-opacity-75 tw-rounded-full"
          >
            <button @click="closeMenu()">
              <v-icon color="white" size="45">mdi-close-circle</v-icon>
            </button>
          </div>
          <vActionsSelectUI
            @discartaSelect="discartaSelect"
            @removerItem="removerItem"
            :objetoSelecionado="getSelectedObject"
          />
          <div v-if="mountView == 'textoEditor'">
            <SimpleKeyboard
              @onCreateText="criarTextoNoCanvasAtual"
              @onChange="onChange"
              :input="inputText"
            />
          </div>
          <div v-show="mountView == 'emoji'" class="tw-p-2 tw-text-center">
            <div class="tw-grid tw-grid-cols-4 tw-items-center tw-mx-5 tw-my-3">
              <div
                class="tw-col-span-1 tw-text-white tw-text-4xl tw-mb-1 tw-text-left"
              >
                Emojis
              </div>
              <div class="tw-col-span-3 tw-mb-2 tw-text-right">
                <button
                  v-if="getSelectedObject && getSelectedObject.tipo == 'emoji'"
                  @click="removerItem('emoji')"
                  class="tw-bg-transparent tw-mr-1 tw-text-white tw-p-3 tw-text-2xl tw-uppercase tw-font-normal tw-inline-grid tw-grid-flow-col tw-items-center tw-rounded-2xl tw-border-2 tw-border-solid tw-border-white"
                >
                  <div class="tw-pr-2">
                    <v-icon size="35" color="white">mdi-delete-circle</v-icon>
                  </div>
                  <div class="tw-text-white">Selecionado</div>
                </button>
                <button
                  @click="removerTodosOsItemsDesseTipo('emoji')"
                  class="tw-bg-transparent tw-text-white tw-p-3 tw-text-2xl tw-uppercase tw-font-normal tw-inline-grid tw-grid-flow-col tw-items-center tw-rounded-2xl tw-border-2 tw-border-solid tw-border-white"
                >
                  <div class="tw-pr-2">
                    <v-icon size="35" color="white">mdi-delete-circle</v-icon>
                  </div>
                  <div class="tw-text-white">Limpar</div>
                </button>
              </div>
            </div>
            <div class="tw-flex tw-justify-between w-full">
              <!-- <router-link tag="li" active-class="active" to="/" exact><a>Home</a></router-link> -->
              <!-- <router-link
                to="/foo"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
                custom
              >
                <li
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                  ]"
                >
                  <a :href="href" @click="navigate">{{ route.fullPath }}</a>
                </li>
              </router-link> -->
              <EmojiButton
                v-for="group in emojiGroups"
                :key="group.value"
                :value="`#${group.value}`"
                :label="`${group.label}`"
              />
              <!-- <router-link
                :to="`#${group.value}`"
                v-for="group in emojiGroups"
                :key="group.value"
                v-slot="{ href, navigate, isActive }"
                custom
              >
                <a
                  :href="href"
                  @click="
                    (e) => {
                      navigate(e);
                      rolarListaAteLink('#lista-emojis', `#${group.value}`);
                    }
                  "
                  :class="[
                    'tw-flex tw-flex-col tw-gap-y-3 tw-justify-center tw-items-center',
                    isActive && 'active',
                  ]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="50"
                    width="50"
                    preserveAspectRatio="xMidYMid meet"
                    :class="['tw-text-white', isActive && 'active']"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enable-background="new 0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12,22.1C6.4,22.1,1.9,17.6,1.9,12S6.4,1.9,12,1.9S22.1,6.4,22.1,12S17.6,22.1,12,22.1z M12,3.5 c-4.7,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S16.7,3.5,12,3.5z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M8.9,11.6c0.7,0,1.3-0.7,1.3-1.5S9.6,8.6,8.9,8.6s-1.3,0.7-1.3,1.5C7.6,10.9,8.2,11.6,8.9,11.6z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M17.1,13.6c-1.1,0.1-3,0.4-5,0.4s-4-0.3-5-0.4c-0.4,0-0.6,0.3-0.4,0.7c1.1,2,3.1,3.5,5.5,3.5 c2.3,0,4.4-1.5,5.5-3.5C17.8,14,17.5,13.6,17.1,13.6z M12.3,16c-2.6,0-4.1-1-4.2-1.6c0,0,4.4,0.9,8,0C16.1,14.4,15.6,16,12.3,16z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M15.1,11.6c0.7,0,1.3-0.7,1.3-1.5s-0.6-1.5-1.3-1.5s-1.3,0.7-1.3,1.5C13.8,10.9,14.4,11.6,15.1,11.6z"
                    ></path>
                  </svg>

                  <span
                    :class="[
                      'tw-text-white tw-text-center',
                      isActive && 'active',
                    ]"
                    >{{ group.label }}</span
                  >
                </a>
              </router-link> -->
            </div>
            <ul
              class="tw-overflow-x-auto tw-max-h-72 scroll-modern tw-mt-5"
              id="lista-emojis"
            >
              <li
                v-for="group in emojiGroups"
                :key="group.value"
                class="tw-mb-20"
              >
                <h1
                  :id="`#${group.value}`"
                  class="tw-text-white tw-font-bold tw-text-2xl tw-text-left tw-pl-20 tw-mb-10"
                >
                  {{ group.label }}
                </h1>
                <section class="tw-grid tw-grid-cols-4 tw-gap-6">
                  <div
                    v-for="(item, index) in group.items"
                    :key="index"
                    class="tw-text-3xl tw-text-white"
                    @click="criarEmojiNoCanvasAtual(item.char)"
                  >
                    {{ item.char }}
                  </div>
                </section>
              </li>
            </ul>
          </div>

          <div
            v-if="mountView == 'brilho-contraste'"
            class="tw-h-40 tw-p-4 tw-text-center"
          >
            <div class="tw-text-white tw-text-4xl tw-py-2">Brilho</div>
            <div
              class="tw-py-2 tw-grid tw-grid-cols-5 tw-justify-center tw-items-center"
            >
              <div class="tw-col-span-1">
                <button class="btnPlusMinus" @click="sumOrMinusBrilhance('-')">
                  -
                </button>
              </div>
              <div class="tw-col-span-3">
                <input
                  class="tw-w-2/3 tw-bg-white"
                  id="range"
                  type="range"
                  min="0"
                  max="10"
                  v-model="include.brilho"
                />
              </div>
              <div class="tw-col-span-1">
                <button class="btnPlusMinus" @click="sumOrMinusBrilhance('+')">
                  +
                </button>
              </div>
            </div>
            <div class="tw-text-white tw-text-4xl tw-py-2">Contraste</div>
            <div class="tw-py-2 tw-grid tw-grid-cols-5 tw-items-center">
              <div class="tw-col-span-1">
                <button class="btnPlusMinus" @click="sumOrMinusContrast('-')">
                  -
                </button>
              </div>
              <div class="tw-col-span-3">
                <input
                  id="range"
                  class="tw-w-2/3"
                  type="range"
                  min="0"
                  max="10"
                  v-model="include.contraste"
                />
              </div>
              <div class="tw-col-span-1">
                <button class="btnPlusMinus" @click="sumOrMinusContrast('+')">
                  +
                </button>
              </div>
            </div>
          </div>
          <div v-if="mountView == 'molduras'">
            <div class="tw-mt-4">
              <div class="tw-pl-5 tw-text-white tw-text-3xl">Molduras</div>
              <div class="containCards scroll-modern">
                <div
                  class="containCardMoldura"
                  :key="moldura.id"
                  v-for="moldura in listaMolduras"
                >
                  <div
                    class="cardMoldura"
                    @click="selecionarMoldura(moldura.dados)"
                  >
                    <div class="p-1">
                      <div
                        :id="moldura.id"
                        class="imagem"
                        :class="{
                          cardMolduraSelected:
                            imgMolduraSelecionada == moldura.dados,
                        }"
                      >
                        <img
                          :src="moldura.dados.url"
                          :alt="moldura.dados.descricao"
                          :style="{ height: '100%' }"
                        />
                      </div>
                    </div>
                    <div class="descricao">{{ moldura.descricao }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="mountView == 'filtros'" class="tw-py-5 tw-px-0">
            <div
              class="tw-pb-4 tw-text-3xl tw-text-center tw-uppercase tw-text-white"
            >
              Filtros
            </div>
            <div
              class="tw-p-8 tw-flex tw-overflow-x-auto scroll-modern"
              style="image-rendering: optimizeQuality"
            >
              <vBtnFiltro
                filter="semfiltro"
                :fotoAtual="getImagemAtual"
                @eventClick="apagarFiltrosExistentes()"
              >
                Sem filtro
              </vBtnFiltro>
              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="Grayscale"
                @eventClick="iniciaFiltro('Grayscale')"
              >
                Grayscale</vBtnFiltro
              >
              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="Sepia"
                @eventClick="iniciaFiltro('Sepia')"
                >Sépia
              </vBtnFiltro>
              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="OldTimes"
                @eventClick="iniciaFiltro('OldTimes')"
                >OldTimes
              </vBtnFiltro>
              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="Noise"
                @eventClick="iniciaFiltro('Noise')"
                >Noise
              </vBtnFiltro>
              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="Vibrance"
                @eventClick="iniciaFiltro('Vibrance')"
                >Vibrance
              </vBtnFiltro>
              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="Convolute"
                @eventClick="iniciaFiltro('Convolute')"
              >
                Convolute</vBtnFiltro
              >

              <vBtnFiltro
                :fotoAtual="getImagemAtual"
                filter="HueRotation"
                @eventClick="iniciaFiltro('HueRotation')"
              >
                Matiz Aleatória</vBtnFiltro
              >
            </div>
          </div>
          <div v-if="mountView == 'cortes'">
            <div
              class="tw-p-4 tw-text-3xl tw-text-center tw-uppercase tw-text-white"
            >
              Cortar
            </div>
            <div class="tw-p-2 tw-text-center">
              <div>
                <button
                  class="tw-uppercase tw-text-3xl tw-bg-white tw-p-4 tw-rounded-xl tw-w-2/4"
                  @click="cropper()"
                  v-if="cropToggle"
                >
                  Finalizar
                </button>
              </div>
              <div>
                <button
                  class="tw-uppercase tw-text-3xl tw-mt-3 tw-bg-white tw-p-4 tw-rounded-xl tw-w-2/4"
                  @click="cancelarCropper()"
                  v-if="cropToggle"
                >
                  Cancelar
                </button>
              </div>
              <button
                class="tw-uppercase tw-text-3xl tw-bg-white tw-p-4 tw-rounded-xl tw-w-2/4"
                @click="initCropper()"
                v-if="!cropToggle"
              >
                Iniciar corte
              </button>
            </div>
          </div>
          <div v-if="mountView == 'objetos'"></div>
          <div v-if="mountView == 'girar-imagem'">
            <div id="flipMenu">
              <div
                class="tw-p-4 tw--mt-10 tw-mb-10 tw-text-3xl tw-text-center tw-uppercase tw-text-white"
              >
                Posições
              </div>
              <div class="tw-grid tw-grid-cols-2">
                <div class="tw-text-center tw-justify-center tw-items-center">
                  <div
                    class="tw-text-center tw-text-white tw-uppercase tw-mb-10 tw-text-2xl"
                  >
                    Virar foto
                  </div>
                  <div class="tw-mb-10">
                    <button
                      class="tw-bg-white tw-text-xl tw-w-2/3 tw-p-5 tw-rounded-xl"
                      @click="flipImagem('horizontal')"
                    >
                      Horizontal
                    </button>
                  </div>
                  <div>
                    <button
                      class="tw-bg-white tw-text-xl tw-w-2/3 tw-p-5 tw-rounded-xl"
                      @click="flipImagem('vertical')"
                    >
                      Vertical
                    </button>
                  </div>
                </div>
                <div id="menuGirar" class="tw-pr-8">
                  <div
                    class="tw-text-center tw-uppercase tw-text-2xl tw-text-white tw-mb-5"
                  >
                    Girar Foto
                  </div>
                  <div
                    class="rotate-photo-grid-container tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-gap-8 tw-text-center tw-justify-center tw-items-stretch"
                  >
                    <div class="tw-col-span-1">
                      <button
                        class="tw-bg-white tw-rounded-xl tw-p-5 tw-w-full tw-h-full"
                        @click="rotateImagem('left')"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="tw-h-8 tw-w-8 tw-mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                        <div class="tw-text-xl">Para esquerda</div>
                      </button>
                    </div>
                    <div class="tw-col-span-1">
                      <button
                        class="tw-bg-white tw-rounded-xl tw-p-5 tw-w-full tw-h-full"
                        @click="rotateImagem('right')"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="tw-h-8 tw-w-8 tw-mx-auto"
                          style="transform: scaleX(-1)"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                        <div class="tw-text-xl">Para direita</div>
                      </button>
                    </div>
                    <div class="tw-text-center">
                      <button
                        class="tw-text-2xl tw-rounded-xl tw-h-full tw-bg-white tw-inline-block tw-w-full tw-mx-auto tw-p-4"
                        @click="centralizarImagem()"
                      >
                        Centralizar
                      </button>
                    </div>
                    <div
                      class="tw-text-center"
                      v-if="showChangeOrientationButton"
                    >
                      <button
                        class="tw-text-2xl tw-rounded-xl tw-h-full tw-bg-white tw-inline-block tw-w-full tw-mx-auto tw-p-4"
                        @click="changeOrientation()"
                      >
                        {{ changeOrientationButtonText }}
                      </button>
                    </div>
                  </div>
                  <div class="tw-grid tw-grid-cols-2 tw-gap-12 tw-px-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="bottomMenu"
          :class="`tw-mt-0 tw-overflow-x-auto tw-p-2 tw-bg-black tw-bg-opacity-20 scroll-modern tw-bottom-0 tw-relative tw-grid tw-grid-cols-4 tw-gap-x-1`"
          :style="{ 'grid-template-rows': '75px 75px' }"
        >
          <div
            class="tw-cursor-pointer tw-text-center tw-object-center tw-text-white tw-max-w-[80px] tw-rounded-xl tw-flex tw-justify-center tw-items-center tw-flex-col"
            :key="index"
            v-for="(item, index) in getItemsMenu"
            @click="SelectMenuItem(item)"
            :class="{
              'tw-bg-white tw-bg-opacity-10 tw-rounded-xl':
                mountView == item.mount,
              bgCustom: item.mount == 'confirm',
            }"
          >
            <!-- '': item.mount == 'confirm', -->
            <div>
              <v-icon size="25" color="white">{{ item.icon }}</v-icon>
            </div>
            <div class="tw-text-center tw-font-normal tw-uppercase tw-text-xl">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <vLoadingInterface v-if="modalInterfaceLoading" />
    <div>
      <vFullModal v-if="mountView == 'confirm'">
        <template v-slot:header>
          <div>
            <div class="tw-text-5xl tw-font-bold">Já terminou de editar ?</div>
            <div class="tw-text-4xl tw-mt-10 tw-w-4/5 tw-mx-auto">
              Ao concluir, você não poderá editar novamente as imagens.
            </div>
            <div class="tw-text-4xl tw-mt-10">Deseja ir para o pagamento?</div>
          </div>
        </template>
        <template v-slot:footer>
          <div>
            <div class="tw-mt-28 tw-mx-20 tw-text-4xl">
              <button
                class="tw-uppercase tw-rounded-xl tw-border-4 tw-p-5 tw-w-full tw-border-white tw-border-solid"
                @click="processoFinalizar()"
                :disabled="loadingFinalizar"
              >
                <div v-if="loadingFinalizar" class="tw-text-center">
                  <v-icon size="50" color="white" class="tw-animate-spin"
                    >mdi-loading</v-icon
                  >
                </div>
                <div v-else>SIM, QUERO PAGAR</div>
              </button>
            </div>
            <div class="tw-mt-20 tw-mx-20 tw-text-4xl">
              <button
                class="tw-uppercase tw-rounded-xl tw-border-4 tw-p-5 tw-w-full tw-border-white tw-border-solid"
                @click="mountView = ''"
                :disabled="loadingFinalizar"
              >
                <div v-if="loadingFinalizar" class="tw-text-center">
                  <v-icon size="50" color="white" class="tw-animate-spin"
                    >mdi-loading</v-icon
                  >
                </div>
                <div v-else>Não, continuar editando</div>
              </button>
            </div>
          </div>
        </template>
      </vFullModal>
    </div>
  </div>
</template>

<script>
import {
  storageInst,
  setEtapaCompra,
  storageMolduras,
} from "@/service/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { fabric } from "fabric";
import vBtnFiltro from "@/components/btnFiltro";
import typeEtapa from "@/constants/etapaCompra";
import vFullModal from "@/components/fullScreenModal";
import emojis from "emoji.json/emoji-compact.json";
import vLoadingInterface from "./vLoadingInterface";
import SimpleKeyboard from "./keyboard.vue";
import vActionsSelectUI from "./ActionsSelectUI.vue";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../service/firebase";
import { tiposDeFotos } from "@/constants/tipoFoto.js";
import SmileysEmotions from "../../../assets/emojis/Smileys & Emotion.json";
import AnimalNature from "../../../assets/emojis/Animals & Nature.json";
import FoodDrink from "../../../assets/emojis/Food & Drink.json";
import TravelPlaces from "../../../assets/emojis/Travel & Places.json";
import Activities from "../../../assets/emojis/Activities.json";
import Objects from "../../../assets/emojis/Objects.json";
import Flags from "../../../assets/emojis/Flags.json";
import Symbols from "../../../assets/emojis/Symbols.json";
import EmojiButton from "../../../components/emojiButton.vue";

fabric.textureSize = 4096; // original 4096 | recomendado SafeLimit 2408
fabric.initFilterBackend = function () {
  if (
    fabric.enableGLFiltering &&
    fabric.isWebglSupported &&
    fabric.isWebglSupported(fabric.textureSize)
  ) {
    return new fabric.WebglFilterBackend({ tileSize: fabric.textureSize });
  } else if (fabric.Canvas2dFilterBackend) {
    return new fabric.Canvas2dFilterBackend();
  }
};

fabric.Canvas.prototype.getItem = function (id) {
  var object = null,
    objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
    if (objects[i].id && objects[i].id === id) {
      object = objects[i];
      break;
    }
  }
  return object;
};
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = "white";
fabric.Object.prototype.cornerStyle = "circle";
fabric.Object.prototype.borderColor = "black";
fabric.Object.prototype.cornerStrokeColor = "black";

var FontFaceObserver = require("fontfaceobserver");
// SIZE 3/4
// 113,38 x 151,18

export default {
  components: {
    vActionsSelectUI,
    vLoadingInterface,
    vBtnFiltro,
    vFullModal,
    SimpleKeyboard,
    EmojiButton,
  },
  data() {
    return {
      listaMolduras: [],
      numeroDeRenderesFinalizados: 0,
      modalConcluir: true,
      loadingFinalizar: false,
      toggleResetOriginal: false,
      listaEmoji: [],
      isSelectedText: false,
      imgMolduraSelecionada: null,
      changedOrientation: {},
      menuList: [
        {
          name: "Finalizar",
          mount: "confirm",
          icon: "mdi-check-all",
        },
        {
          name: "Filtros",
          mount: "filtros",
          icon: "mdi-image-edit",
        },
        {
          name: "Emojis",
          mount: "emoji",
          icon: "mdi-emoticon",
        },
        {
          name: "Texto",
          mount: "textoEditor",
          icon: "mdi-pencil",
        },
        {
          name: "Brilho",
          mount: "brilho-contraste",
          icon: "mdi-brightness-6",
        },
        {
          name: "Molduras",
          mount: "molduras",
          icon: "mdi-panorama-variant-outline",
        },
        {
          name: "Posições",
          mount: "girar-imagem",
          icon: "mdi-rotate-right",
        },
        {
          name: "Cortar",
          mount: "cortes",
          icon: "mdi-scissors-cutting",
        },
      ],
      hiddenFotos: false,
      modalInterfaceLoading: true, // ! era false
      canvas: [],
      listaImagens: [],
      listaReferencias: [],
      itemSelecionado: "",
      indexAtualDaFoto: 0,
      tipo: "polaroid",
      mountView: "",
      contadorUpload: 0,
      contadorUploadMax: 0,
      include: {
        brilho: 0,
        contraste: 0,
      },
      includeOutput: {
        brilho: 0,
        contraste: 0,
      },
      cropRect: "",
      cropToggle: false,
      inputText: "",
      emojiGroups: [
        {
          value: "Smileys & Emotion",
          label: "Smileys e Pessoas",
          items: SmileysEmotions,
        },
        {
          value: "Animals & Nature",
          label: "Animais e Natureza",
          items: AnimalNature,
        },
        { value: "Food & Drink", label: "Comida e Bebida", items: FoodDrink },
        {
          value: "Travel & Places",
          label: "Viagem e Locais",
          items: TravelPlaces,
        },
        { value: "Activities", label: "Atividades", items: Activities },
        { value: "Objects", label: "Objetos", items: Objects },
        { value: "Symbols", label: "Símbolos", items: Symbols },
        { value: "Flags", label: "Bandeiras", items: Flags },
      ],
    };
  },
  watch: {
    "include.brilho": function () {
      this.calcBrilho();
      this.iniciaFiltro("Brightness", true);
    },
    "include.contraste": function () {
      this.calcContraste();
      this.iniciaFiltro("Contrast", true);
    },
    changedOrientation() {
      const flipped = this.changedOrientation[this.indexAtualDaFoto];
      const { width, height } = this.getSizeFoto(this.tipo);
      const currentCanvas = this.getCanvas();

      if (flipped) {
        currentCanvas.setWidth(height);
        currentCanvas.setHeight(width);
      } else {
        currentCanvas.setWidth(width);
        currentCanvas.setHeight(height);
      }

      this.centralizarImagem();
    },
  },
  computed: {
    showChangeOrientationButton() {
      return (
        this.tipo === tiposDeFotos.NORMAL ||
        this.tipo === tiposDeFotos.FOTOS_3X4
      );
    },
    changeOrientationButtonText() {
      const landscape = "Usar modo paisagem";
      const portrait = "Usar modo retrato";
      const original = this.tipo === tiposDeFotos.NORMAL ? landscape : portrait;
      const flipped = this.tipo === tiposDeFotos.NORMAL ? portrait : landscape;

      return this.changedOrientation[this.indexAtualDaFoto]
        ? original
        : flipped;
    },
    getItemsMenu() {
      //insert bussines rule in menu
      return this.menuList;
    },
    canvasContainerStyle() {
      // this.imgMolduraSelecionada;
      if (!this.imgMolduraSelecionada) return {};
      if (this.imgMolduraSelecionada.tipo === "polaroid") {
        return {
          backgroundImage: `url(${this.imgMolduraSelecionada.url})`,
          backgroundSize: "cover",
        };
      }
      return {};
    },
    getListEmoji() {
      return this.listaEmoji;
    },
    getSelectedObject() {
      if (this.itemSelecionado.toObject) {
        return this.itemSelecionado.toObject();
      }
      return this.itemSelecionado;
    },
    getObjects() {
      return this.getCanvas().getObjects();
    },
    getImagemAtual() {
      let fotoSRC = this.listaImagens[this.indexAtualDaFoto];
      if (fotoSRC) return fotoSRC;
      else return {};
    },
    getCompra() {
      return this.$store.getters["compra/getCompra"];
    },
  },
  beforeMount() {
    this.initMountInterface();
  },
  mounted() {
    this.listaEmoji = emojis;
  },
  beforeDestroy() {
    this.listaReferencias.forEach((item, index) => {
      this.canvas[index].instancia.clear();
      this.canvas[index].instancia.dispose();
      this.canvas[index].instancia.off("selection:created");
      this.canvas[index].instancia.off("selection:updated");
      if (this.listaReferencias.length == index + 1) {
        this.canvas = [];
      }
    });
  },
  methods: {
    changeOrientation() {
      this.changedOrientation = {
        ...this.changedOrientation,
        [this.indexAtualDaFoto]:
          !this.changedOrientation[this.indexAtualDaFoto],
      };
    },
    validaExistenciaDeMoldura() {
      let canvas = this.getCanvas();
      let objetosDoCanvas = canvas.getObjects();
      objetosDoCanvas.forEach((item) => {
        let bin = item.toObject();
        if (bin.tipo == "moldura") {
          this.deleteItemForItem(item);
        }
      });
    },
    selecionarMoldura(item) {
      console.log("selecionarMoldura", item);
      this.imgMolduraSelecionada = item;
      let ruler = this.getSizeFoto(this.tipo);
      let canvasAtual = this.getCanvas();
      this.validaExistenciaDeMoldura();
      canvasAtual.renderAll();
      fabric.Image.fromURL(
        `${item.url}`,
        (img) => {
          img.set({
            left: 0,
            top: 0,
            // selectable: true,
            selectable: false,
            hasControls: false,
          });

          console.log({ ruler });
          console.log({ imgH: img.height });
          console.log({ imgW: img.width });
          if (img.width > img.height) {
            img.scaleToHeight(ruler.height);
            if (img.getScaledWidth() < ruler.width) {
              this.redimencionaRangeImage("W", img);
            }
          } else {
            img.scaleToWidth(ruler.width);
            if (img.getScaledHeight() < ruler.height) {
              this.redimencionaRangeImage("H", img);
            }
          }

          console.log({
            tipo: "moldura",
            width: img.width,
            height: img.height,
          });
          img.toObject = function () {
            return {
              tipo: "moldura",
              width: img.width,
              height: img.height,
            };
          };
          canvasAtual.viewportCenterObject(img);
          canvasAtual.add(img);
          canvasAtual.moveTo(img, 1);
          this.discartaSelect();
          canvasAtual.renderAll();
        },
        { crossOrigin: "anonymous" }
      );
    },
    linkagemDeImagemUrl(item) {
      let newItem = item;
      let filename = item.dados.referenciaStorage;
      let refStorage = ref(storageMolduras, filename);
      getDownloadURL(refStorage).then((link) => {
        let compraTipoFoto = this.getCompra.tipo_foto;
        console.log({ newItem });
        console.log({ compraTipoFoto });
        newItem.dados.url = link;
        if (compraTipoFoto == item.dados.tipo) {
          this.listaMolduras.push({ ...newItem });
        }
      });
    },
    async carregaFirestoreMoldura() {
      let referencia = collection(db, "/molduras");
      const moldurasList = await getDocs(referencia);

      moldurasList.forEach((snap) => {
        let payload = {
          dados: snap.data(),
          id: snap.id,
        };
        this.linkagemDeImagemUrl(payload);
      });

      // this.listaMolduras = [
      //   {
      //     dados: {
      //       referenciaStorage: "polaroid/XKJHNGFXNYEJ",
      //       timestamp: { seconds: 1696984031, nanoseconds: 232000000 },
      //       descricao: "Natal",
      //       tipo: "polaroid",
      //       ativo: false,
      //       url: "https://firebasestorage.googleapis.com/v0/b/photonow-app-molduras/o/polaroid%2FXKJHNGFXNYEJ?alt=media&token=d13278d2-a08c-470a-b4cb-8fea6c352caa",
      //     },
      //     id: "yd9aQY0pXwEsDHu99jKi",
      //   },
      //   {
      //     dados: {
      //       timestamp: { seconds: 1699584120, nanoseconds: 382000000 },
      //       ativo: true,
      //       tipo: "normal",
      //       descricao: "Moldura natalina Normal",
      //       referenciaStorage: "normal/PMORDTUHNVUL",
      //       url: "https://firebasestorage.googleapis.com/v0/b/photonow-app-molduras/o/normal%2FPMORDTUHNVUL?alt=media&token=470496c9-bf89-4983-9f4a-4acea1c5bd84",
      //     },
      //     id: "BXcX5KONwdds5sOEXl8Y",
      //   },
      //   {
      //     dados: {
      //       tipo: "polaroid",
      //       timestamp: { seconds: 1699580483, nanoseconds: 368000000 },
      //       descricao: "Moldura natalina",
      //       ativo: false,
      //       referenciaStorage: "polaroid/ABVQHKQQODMU",
      //       url: "https://firebasestorage.googleapis.com/v0/b/photonow-app-molduras/o/polaroid%2FABVQHKQQODMU?alt=media&token=87ce9c09-242e-4a32-86b6-e34e0902f659",
      //     },
      //     id: "t7ndaXg81FAOy9ZMtM17",
      //   },
      //   {
      //     dados: {
      //       referenciaStorage: "polaroid/PZWUNOTEJMFZ",
      //       timestamp: { seconds: 1672794947, nanoseconds: 377000000 },
      //       tipo: "polaroid",
      //       descricao: "teste",
      //       ativo: true,
      //       url: "https://firebasestorage.googleapis.com/v0/b/photonow-app-molduras/o/polaroid%2FPZWUNOTEJMFZ?alt=media&token=22e1f6c0-b111-40e2-af67-b542db403d87",
      //     },
      //     id: "xbk68gebyPMAneJjPNqV",
      //   },
      // ];
      // console.log({ listaMolduras: this.listaMolduras });
      // let compraTipoFoto = this.getCompra.tipo_foto;
      // for (const item of molduras) {
      //   if (compraTipoFoto == item.tipo) {
      //     this.listaMolduras.push(item);
      //   }
      // }
    },
    initEditText() {
      //metodo teste
      let mainText = this.getCanvas().getActiveObject();
      mainText.text = "MOCKTESTE";
      this.getCanvas().renderAll();
    },
    onChange(input) {
      this.inputText = input;
    },
    onInputChange(input) {
      this.inputText = input.target.value;
    },
    closeMenu() {
      if (this.cropToggle) this.cancelarCropper();
      this.mountView = "";
    },
    SelectMenuItem(item) {
      if (this.cropToggle) this.cancelarCropper();
      this.mountView = item.mount;
      // if (item.mount === "molduras") {
      //   setTimeout(() => {
      //     for (const moldura of this.listaMolduras) {
      //       console.log(
      //         "moldura.referenciaStorage: ",
      //         moldura.referenciaStorage
      //       );
      //       document
      //         .getElementById(moldura.referenciaStorage)
      //         .appendChild(moldura.imagem);
      //     }
      //   }, 1000);
      // }
    },
    discartaSelect() {
      let canvas = this.getCanvas();
      let self = this;
      canvas.discardActiveObject(self.itemSelecionado);
      this.itemSelecionado = "";
      canvas.renderAll();
    },
    criarTextoNoCanvasAtual(config) {
      let textPayload = config.text;
      if (!config || !config.text || config.text == "") {
        return false;
      }
      let canvas = this.canvas[this.indexAtualDaFoto].instancia;
      let elementText = new fabric.Textbox(`${config.text}`, {
        left: 20,
        top: 170,
        fontSize: 40,
        fontFamily: config.font,
        editable: false,
      });
      elementText.toObject = function () {
        return { tipo: "texto", text: `${textPayload}` };
      };
      canvas.add(elementText);
      canvas.setActiveObject(elementText);
    },
    criarEmojiNoCanvasAtual(item) {
      let canvas = this.canvas[this.indexAtualDaFoto].instancia;
      let elementEmoticon = new fabric.Textbox(`${item}`, {
        left: 20,
        top: 170,
        fontSize: 120,
      });
      elementEmoticon.toObject = function () {
        return { tipo: "emoji", text: `${item}` };
      };

      canvas.add(elementEmoticon);
      canvas.setActiveObject(elementEmoticon);
    },
    centralizarImagem() {
      this.selecionaImagemZero();
      this.itemSelecionado.center();
      this.canvas[this.indexAtualDaFoto].instancia.renderAll();
    },
    flipImagem(direction) {
      this.selecionaImagemZero();
      if (direction == "horizontal") {
        this.itemSelecionado.flipX = !this.itemSelecionado.flipX;
      } else {
        this.itemSelecionado.flipY = !this.itemSelecionado.flipY;
      }
      this.canvas[this.indexAtualDaFoto].instancia.renderAll();
    },
    rotateImagem(direction) {
      this.selecionaImagemZero();
      let anguloAtual = this.itemSelecionado.angle;
      if (direction == "left") {
        this.itemSelecionado.rotate(anguloAtual - 15);
      } else {
        this.itemSelecionado.rotate(anguloAtual + 15);
      }
      this.canvas[this.indexAtualDaFoto].instancia.renderAll();
    },
    sumOrMinusContrast(method) {
      if (method == "+") {
        if (this.include.contraste < 10) {
          this.include.contraste += 1;
        }
      } else {
        if (this.include.contraste > 0) {
          this.include.contraste -= 1;
        }
      }
    },
    sumOrMinusBrilhance(method) {
      if (method == "+") {
        if (this.include.brilho < 10) {
          this.include.brilho += 1;
        }
      } else {
        if (this.include.brilho > 0) {
          this.include.brilho -= 1;
        }
      }
    },
    hiddenToggle() {
      this.hiddenFotos = !this.hiddenFotos;
    },
    verificaContagem() {
      if (this.contadorUploadMax == this.contadorUpload) {
        // ! teste this.modalInterfaceLoading = false;
        this.loadingFinalizar = false;
        setEtapaCompra(typeEtapa.PAGAMENTO_SELECT);
      }
    },
    createTaskUpload(url_public_editado, imagemDataURI) {
      let self = this;
      const storageRef = ref(storageInst, `${url_public_editado}`);
      uploadString(storageRef, imagemDataURI, "data_url").then(() => {
        self.contadorUpload += 1;
        self.verificaContagem();
      });
    },
    rotateFinalImage(imageDataUrl) {
      const degrees = 90;
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();

        image.onload = function () {
          canvas.width = degrees % 180 === 0 ? image.width : image.height;
          canvas.height = degrees % 180 === 0 ? image.height : image.width;

          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((degrees * Math.PI) / 180);
          ctx.drawImage(image, image.width / -2, image.height / -2);

          resolve(canvas.toDataURL());
        };

        image.onerror = function () {
          resolve(imageDataUrl);
        };

        image.src = imageDataUrl;
      });
    },
    async salvaCanvas(canvas, index) {
      const options = {
        format: "png",
        quality: 1,
        multiplier: 2,
      };
      let imagemDataUrl = this.canvas[index].instancia.toDataURL(options);

      if (this.changedOrientation[index]) {
        imagemDataUrl = await this.rotateFinalImage(imagemDataUrl);
      }

      let url_ref_editada = this.canvas[index].propriedades.url_editada;
      this.createTaskUpload(url_ref_editada, imagemDataUrl);
    },
    processoFinalizar() {
      this.modalInterfaceLoading = true;
      this.loadingFinalizar = true;
      this.contadorUploadMax = this.canvas.length;
      this.canvas.forEach((can, index) => {
        this.salvaCanvas(can, index);
      });
    },
    getCanvas() {
      let indexAtual = this.indexAtualDaFoto;
      let payload = this.canvas[indexAtual].instancia;
      return payload;
    },
    initCropper() {
      let self = this;
      let canvas = this.getCanvas();
      this.cropToggle = true;
      this.cropRect = new fabric.Rect({
        fill: "rgba(0,0,0,0.3)",
        originX: "left",
        originY: "top",
        stroke: "black",
        opacity: 1,
        width: self.getSizeFoto(self.tipo).width / 2,
        height: self.getSizeFoto(self.tipo).height / 2,
        hasRotatingPoint: false,
        transparentCorners: false,
        cornerColor: "white",
        cornerStrokeColor: "black",
        borderColor: "black",
        absolutePositioned: true,
        uiCut: "objetoCorte",
      });
      this.cropRect.scaleToHeight(300);
      canvas.discardActiveObject();
      canvas.centerObject(self.cropRect);
      this.cropRect.visible = true;
      canvas.add(this.cropRect);
      canvas.setActiveObject(this.cropRect);
    },
    cancelarCropper() {
      let canvas = this.getCanvas();
      let itens = canvas.getObjects();
      itens.forEach((item) => {
        if (item.uiCut == "objetoCorte") {
          canvas.remove(item);
          canvas.discardActiveObject();
          this.cropToggle = false;
        }
      });
    },
    cropper() {
      //CROP NOW!
      let cropped = new Image();
      let canvas = this.getCanvas();
      let cropRect = this.cropRect;
      let rect = new fabric.Rect({
        left: cropRect.left,
        top: cropRect.top,
        width: cropRect.getScaledWidth(),
        height: cropRect.getScaledHeight(),
        absolutePositioned: true,
      });
      canvas.item(0).clipPath = rect;
      canvas.remove(cropRect);
      this.cropRect = canvas.getActiveObject();
      cropped.src = canvas.toDataURL({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
      cropped.onload = function () {
        canvas.clear();
        let image = new fabric.Image(cropped);
        image.left = rect.left;
        image.top = rect.top;
        image.setCoords();
        canvas.add(image);
        canvas.backgroundColor = "rgba(255,255,255,1)";
        canvas.renderAll();
      };
      this.cropToggle = false;
    },
    iniciaTodasAsFotos(contem) {
      let deveConter = this.listaReferencias.length;
      if (deveConter != contem) return false;

      this.listaImagens.forEach((foto, index) => {
        this.gerarFotoNoCanvas(foto, index);
      });
    },
    zeraUpdateDoCanvasAtual() {
      if (this.toggleResetOriginal) return false;
      this.toggleResetOriginal = true;
      let self = this;
      let canvasAtual = this.getCanvas();
      canvasAtual.clear();
      canvasAtual.backgroundColor = "rgba(255,255,255,1)";
      canvasAtual.renderAll();
      this.listaImagens.filter((fotoRef, index) => {
        if (index == this.indexAtualDaFoto) {
          self.gerarFotoNoCanvasZerada(fotoRef, this.indexAtualDaFoto);
        }
      });
    },
    redimencionaRangeImage(param, img) {
      let canvasSize = this.getSizeFoto(this.tipo);
      let ffm = img.getObjectScaling();
      img._set("scaleX", ffm.scaleX + 0.001);
      img._set("scaleY", ffm.scaleY + 0.001);
      if (param == "W" && img.getScaledWidth() < canvasSize.width) {
        this.redimencionaRangeImage(param, img);
      }
      if (param == "H" && img.getScaledHeight() < canvasSize.height) {
        this.redimencionaRangeImage(param, img);
      }
    },
    async gerarFotoNoCanvasZerada(referencia, index) {
      let canvasAtual = this.canvas[index].instancia;
      let canvasSize = this.getSizeFoto(this.tipo);
      let self = this;
      const imagemOriginal = new Image();
      imagemOriginal.onload = async function () {
        integrarImagem();
      };
      imagemOriginal.src = `${referencia.src}`;

      function integrarImagem() {
        fabric.Image.fromURL(
          `${referencia.src}`,
          (img) => {
            img.set({
              left: 0,
              top: 0,
            });

            if (img.width > img.height) {
              img.scaleToHeight(canvasSize.height);
              if (img.getScaledWidth() < canvasSize.width) {
                self.redimencionaRangeImage("W", img);
              }
            } else {
              img.scaleToWidth(canvasSize.height);
              if (img.getScaledHeight() < canvasSize.height) {
                self.redimencionaRangeImage("H", img);
              }
            }
            img.toObject = function () {
              return {
                tipo: "foto",
                width: img.width,
                height: img.height,
              };
            };
            canvasAtual.add(img);
            canvasAtual.renderAll();
            const font = new FontFaceObserver("Pacifico");
            font.load().then(function () {
              console.log("carregoufonte");
              self.toggleResetOriginal = false;
            });
            img.center();
          },
          {
            crossOrigin: "Anonymous",
          }
        );
      }
    },
    async gerarFotoNoCanvas(referencia, index) {
      let canvasAtual = this.canvas[index].instancia;
      let canvasSize = this.getSizeFoto(this.tipo);
      let self = this;
      const imagemOriginal = new Image();
      imagemOriginal.onload = async function () {
        integrarImagem();
      };
      imagemOriginal.src = `${referencia.src}`;

      function integrarImagem() {
        fabric.Image.fromURL(
          `${referencia.src}`,
          (img) => {
            img.set({
              left: 0,
              top: 0,
            });

            if (img.width > img.height) {
              img.scaleToHeight(canvasSize.height);
              if (img.getScaledWidth() < canvasSize.width) {
                self.redimencionaRangeImage("W", img);
              }
            } else {
              img.scaleToWidth(canvasSize.height);
              if (img.getScaledHeight() < canvasSize.height) {
                self.redimencionaRangeImage("H", img);
              }
            }
            img.toObject = function () {
              return {
                tipo: "foto",
                width: img.width,
                height: img.height,
              };
            };
            canvasAtual.add(img);
            canvasAtual.renderAll();

            self.numeroDeRenderesFinalizados += 1;
            if (self.numeroDeRenderesFinalizados == self.listaImagens.length) {
              const font = new FontFaceObserver("Pacifico");
              font.load().then(function () {
                self.modalInterfaceLoading = false;
              });
            }
            // img.scaleToHeight(canvasAtual.height);
            img.center();
          },
          {
            crossOrigin: "Anonymous",
          }
        );
      }
    },
    async initMountInterface() {
      let self = this;
      this.tipo = this.$store.getters["compra/getCompra"].tipo_foto;
      this.carregaFirestoreMoldura();
      let FotosRef = collection(db, "fotos");

      if (this.tipo === undefined) {
        this.tipo = "normal";
        this.getCompra.id = "cgjGjirTdjBprLpTWd5M";
      }

      let searchQuery = query(
        FotosRef,
        where("compra_id", "==", `${this.getCompra.id}`)
      );
      let querySnaps = await getDocs(searchQuery);
      querySnaps.forEach((item) => {
        let bin = item.data();
        let forgeObj = {
          id: item.id,
          url_editada: bin.url_editada,
          url_original: bin.url_original,
          compra_id: bin.compra_id,
        };
        self.listaReferencias.push(forgeObj);
      });
      this.$nextTick(() => {
        this.criarInstanciasDoCanvas();
        this.buscaURLs();
      });
      /*
      query.get().then(async (querySnapshot) => {
        await querySnapshot.forEach((doc) => {
          let bin = doc.data();
          let forgeObj = {
            id: doc.id,
            url_editada: bin.url_editada,
            url_original: bin.url_original,
            compra_id: bin.compra_id,
          };
          self.listaReferencias.push(forgeObj);
        });
        this.criarInstanciasDoCanvas();
        this.buscaURLs();
      });*/
    },
    criarInstanciasDoCanvas() {
      let self = this;
      this.listaReferencias.forEach((item, index) => {
        let referenciaCanvas = "canvas" + index;
        let resize = this.getSizeFoto(this.tipo);
        let canvasWidth = resize.width;
        let canvasHeight = resize.height;
        var canvasFabric = new fabric.Canvas(referenciaCanvas, {
          width: canvasWidth,
          height: canvasHeight,
          allowTouchScrolling: false,
          backgroundColor: "rgba(255,255,255,1)",
        });
        this.canvas[index] = {
          instancia: {},
          propriedades: {},
        };
        this.canvas[index].instancia = canvasFabric;
        this.canvas[index].propriedades = {
          url_editada: item.url_editada,
          url_original: item.url_original,
        };
        // ? IMPORTANT
        // this.canvas[index].instancia.preserveObjectStacking = true;
        this.canvas[index].instancia.on("selection:created", () => {
          self.selecionouItem();
        });
        this.canvas[index].instancia.on("selection:updated", () => {
          self.selecionouItem();
        });
        this.canvas[index].instancia.on("selection:cleared", () => {
          self.discartaSelect();
        });

        this.canvas[index].instancia.on("object:moving", () => {
          self.discartaSelect();
        });

        this.canvas[index].instancia.on("object:moving", this.movendoItem);
      });
    },
    movendoItem(event) {
      let itensForCanvas = this.getCanvas().getObjects();
      let selectedItem = this.getCanvas().getActiveObject();
      console.log({ itensForCanvas });
      console.log({ selectedItem });
      console.log("movendoItem: ", event);
    },
    mandaImagemParaTras() {
      const [imgObject] = this.getCanvas().getObjects();
      imgObject.sendToBack();
      this.getCanvas().renderAll();
    },
    buscaURLs() {
      let contagemFotos = 0;
      let self = this;
      this.listaReferencias.forEach((item) => {
        let itemRefStorage = ref(storageInst, `${item.url_original}`);
        getDownloadURL(itemRefStorage)
          .then((url) => {
            contagemFotos++;
            self.listaImagens.push({
              src: url,
              refOriginal: item.url_original,
              refEdicao: item.url_editada,
            });
            self.iniciaTodasAsFotos(contagemFotos);
          })
          .catch((err) => {
            console.error(err);
          });
        /* old V8
        storage
          .ref(item.url_original)
          .getDownloadURL()
          .then((url) => {
            contem++;
            self.listaImagens.push({
              src: url,
              refOriginal: item.url_original,
              refEdicao: item.url_editada,
            });
            self.iniciaTodasAsFotos(contem);
          });
          */
      });
    },
    clear() {
      this.getCanvas().clear();
    },
    getSizeFoto(tipo) {
      if (tipo == tiposDeFotos.POLAROID) {
        // 7,5x10cm
        // 7,2x9cm (área útil)
        return {
          height: 600,
          width: 480,
        };
      } else if (tipo == tiposDeFotos.NORMAL) {
        // 10x15cm
        return {
          height: 431,
          width: 646.5,
        };
      } else if (tipo == tiposDeFotos.FOTOS_3X4) {
        // 3,2x3,9cm
        return {
          height: 600,
          width: 492.3,
        };
      } else {
        throw Error("GetSizeFoto erro de tipo de foto");
      }
    },
    validacaoFotoAtual() {
      let objetos = this.getCanvas().getObjects();
      objetos.forEach((item) => {
        let propriedades = item.toObject();
        if (propriedades && propriedades.tipo && propriedades.tipo == "foto") {
          this.itemSelecionado = item;
        }
      });
    },
    updateCanvas() {
      this.getCanvas().renderAll();
    },
    controleDeTrocaDeCanvas() {
      this.selecionaImagemZero();
      this.carregaInfos();
    },
    carregaInfos() {
      this.mountView = "";
      let filters = this.itemSelecionado.filters;
      this.include.contraste = 0;
      this.include.brilho = 0;
      //this.includeOutput.contraste = 0;
      //this.includeOutput.brilho = 0;
      if (filters.length > 0) {
        this.itemSelecionado.filters.forEach((item) => {
          if (item.type == "Contrast") {
            this.include.contraste = this.revertValuePoint10(item["contrast"]);
          }
          if (item.type == "Brightness") {
            this.include.brilho = this.revertValuePoint10(item["brightness"]);
          }
        });
      }
    },
    revertValuePoint10(value) {
      if (value === 0) {
        return 0;
      } else {
        let mono = String(value).split(".");
        if (mono[0] == 0) {
          return Number(`${mono[1]}`);
        } else {
          return 10;
        }
      }
    },
    aplicaFiltro(name, filter) {
      this.validacaoFotoAtual();
      this.removeFiltro(name);
      this.itemSelecionado.filters.push(filter);
      this.itemSelecionado.applyFilters();
      this.updateCanvas();
    },
    selecionaImagemZero() {
      this.itemSelecionado = this.getCanvas().item(0);
    },
    apagarFiltrosExistentes() {
      this.selecionaImagemZero();
      this.itemSelecionado.filters.forEach((item, index) => {
        if (item.type == "Contrast") {
          //nada
        } else if (item.type == "Brightness") {
          //nada
        } else {
          delete this.itemSelecionado.filters[index];
        }
      });
      this.itemSelecionado.applyFilters();
      this.updateCanvas();
    },
    removeFiltro(name) {
      if (this.itemSelecionado.filters.length > 0) {
        this.itemSelecionado.filters.forEach((item, index) => {
          if (item.type == name) {
            this.itemSelecionado.filters.splice(index, 1);
          }
        });
        this.itemSelecionado.applyFilters();
      }
    },
    calcContraste() {
      //::FILTROS
      let resp = "";
      if (this.include.contraste == 10) resp = 1.0;
      if (this.include.contraste < 10 && this.include.contraste > 0)
        resp = `0.${this.include.contraste}`;
      if (this.include.contraste == 0) resp = 0;
      //operacao
      this.includeOutput.contraste = Number(resp);
    },
    calcBrilho() {
      //::FILTROS
      let resp = "";
      if (this.include.brilho == 10) resp = 1.0;
      if (this.include.brilho < 10 && this.include.brilho > 0)
        resp = `0.${this.include.brilho}`;
      if (this.include.brilho == 0) resp = 0;
      //operacao
      this.includeOutput.brilho = Number(resp);
    },
    iniciaFiltro(name, ignoreRemove) {
      //::FILTROS
      this.selecionaImagemZero();
      if (!ignoreRemove) {
        this.apagarFiltrosExistentes();
      }
      if (name == "Brightness") {
        let monoValue = this.includeOutput.brilho;
        let filter = new fabric.Image.filters.Brightness({
          brightness: monoValue,
        });
        this.aplicaFiltro("Brightness", filter);
      }
      if (name == "Contrast") {
        let monoValue = this.includeOutput.contraste;
        let filter = new fabric.Image.filters.Contrast({
          contrast: monoValue,
        });
        this.aplicaFiltro(name, filter);
      }
      if (name == "Grayscale") {
        let filter = new fabric.Image.filters.Grayscale();
        this.aplicaFiltro(name, filter);
      }
      if (name == "Sepia") {
        let filter = new fabric.Image.filters.Sepia();
        this.aplicaFiltro(name, filter);
      }
      if (name == "Blur") {
        let filter = new fabric.Image.filters.Blur({
          blur: 0.1,
        });
        this.aplicaFiltro(name, filter);
      }
      if (name == "OldTimes") {
        let filter1 = new fabric.Image.filters.Sepia();
        let filter2 = new fabric.Image.filters.Noise({
          noise: 70,
        });
        this.aplicaFiltro(name, filter1);
        this.aplicaFiltro(name, filter2);
      }
      if (name == "Noise") {
        let filter = new fabric.Image.filters.Noise({
          noise: 50,
        });
        this.aplicaFiltro(name, filter);
      }

      if (name == "Convolute") {
        let filter = new fabric.Image.filters.Convolute({
          matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        });
        this.aplicaFiltro(name, filter);
      }
      if (name == "Vibrance") {
        let filter = new fabric.Image.filters.Vibrance({
          vibrance: 1,
        });
        this.aplicaFiltro(name, filter);
      }
      if (name == "HueRotation") {
        let random = "0." + Math.round(Math.random() * 10);
        let filter = new fabric.Image.filters.HueRotation({
          rotation: Number(random),
        });
        this.aplicaFiltro(name, filter);
      }
    },
    selecionouItem() {
      console.log("selecionouItem");
      let itensForCanvas = this.getCanvas().getObjects();
      let selectedItem = this.getCanvas().getActiveObject();
      let response = itensForCanvas.find((item) => {
        if (item == selectedItem) {
          return true;
        }
      });
      this.itemSelecionado = response;
      console.log({ itemSelecionado: this.itemSelecionado });
    },
    removerTodosOsItemsDesseTipo(name) {
      let listaObjetos = this.getCanvas().getObjects();
      listaObjetos.filter((item) => {
        if (item.toObject().tipo == name) {
          this.deleteItemForItem(item);
        }
      });
    },
    removeTipoTexto() {
      let selectedItem = this.getCanvas().getActiveObject();
      if (selectedItem) this.getCanvas().remove(selectedItem);
      this.getCanvas().renderAll();
    },
    deleteItemForItem(item) {
      this.getCanvas().remove(item);
      this.getCanvas().renderAll();
    },
    removerItem() {
      var object = this.getCanvas().getActiveObject();
      if (!object) {
        alert("Selecione o item que deseja remover.");
        this.itemSelecionado = "";
        return false;
      }
      this.itemSelecionado = "";
      this.getCanvas().remove(object);
      this.getCanvas().renderAll();
    },
    selecionaCanvas(index) {
      if (this.cropToggle) {
        alert(
          "Você não pode trocar de imagem com o recort ativo, finalize ou cancele antes."
        );
        return false;
      }
      this.indexAtualDaFoto = index;
      this.controleDeTrocaDeCanvas();
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate-photo-grid-container > :nth-child(3):nth-last-child(1) {
  grid-column: 1 / -1;
}

.btnZera {
  @apply tw-bg-white tw-p-5 tw-px-8 tw-mx-auto tw-text-2xl tw-rounded tw-shadow tw-mt-4 tw-font-normal;
}

.containCards {
  max-height: 400px;
  margin: 10px;
  @apply tw-grid tw-grid-cols-3 tw-flex-row tw-overflow-y-auto tw-flex-wrap tw-justify-start;
}

.containCardMoldura {
  @apply tw-flex-none;

  .cardMoldura {
    width: 230px;
    margin: 4px;
    margin-bottom: 40px;

    .imagem {
      //d
      width: 230px;
      max-width: 230px;
      height: 280px;
      max-height: 280px;
      border: 10px;
      border-radius: 15px;
      border-style: solid;

      &.cardMolduraSelected {
        border-color: #8c2667;
      }
    }

    .descricao {
      color: white;
      @apply tw-p-2 tw-text-lg tw-font-bold tw-capitalize tw-break-all tw-tracking-wider;
    }
  }
}

.bgCustom {
  background: linear-gradient(180deg, #8c2667 0%, #222129 100%);
}

.menuBottom {
  @apply tw-bottom-0 tw-absolute tw-bg-black tw-bg-opacity-95 tw-w-screen tw-py-0;
}

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

.btnPlusMinus {
  @apply tw-w-16 tw-h-16 tw-inline-block tw-shadow-lg tw-border tw-border-solid tw-border-white tw-rounded-full tw-text-white tw-font-light tw-text-3xl tw-items-center tw-justify-center tw-mb-5;
}

.btnUI {
  @apply tw-m-4 tw-p-4 tw-rounded-md tw-text-center;
}

.fixScreen {
  height: 100vh;
  width: 100vw;
}
</style>
