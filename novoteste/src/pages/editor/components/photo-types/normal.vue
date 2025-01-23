<script lang="ts" setup>
import { defineProps, onMounted, watch } from 'vue'
import Konva from 'konva'

interface PolaroidProps {
  url: string
}

const props = defineProps<PolaroidProps>()

let konvaStage: Konva.Stage
let imageElement: Konva.Image
let canvasLayer: Konva.Layer

const updateImage = (imageUrl: string) => {
  const imageObject = new Image()

  imageObject.onload = function () {
    // Calcula a proporção da imagem
    const imageRatio = imageObject.width / imageObject.height
    const containerRatio =
      (konvaStage.width() - 50) / (konvaStage.height() - 50)

    let displayWidth = konvaStage.width() - 50
    let displayHeight = konvaStage.height() - 50

    // Ajusta o tamanho da imagem para manter a proporção
    if (imageRatio > containerRatio) {
      displayWidth = konvaStage.width() - 50
      displayHeight = displayWidth / imageRatio
    } else {
      displayHeight = konvaStage.height() - 50
      displayWidth = displayHeight * imageRatio
    }

    imageElement.width(displayWidth)
    imageElement.height(displayHeight)
    imageElement.image(imageObject)
    canvasLayer.draw() // Redesenha a camada
  }

  imageObject.src = imageUrl
}

onMounted(() => {
  const stageWidth = 646.5
  const stageHeight = 431

  konvaStage = new Konva.Stage({
    container: 'container',
    width: stageWidth,
    height: stageHeight,
  })

  canvasLayer = new Konva.Layer()
  konvaStage.add(canvasLayer)

  const backgroundRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: stageWidth,
    height: stageHeight,
    fill: '#FFFFFF',
  })

  const imagePlaceholderRect = new Konva.Rect({
    x: 25,
    y: 25,
    width: stageWidth - 50,
    height: stageHeight - 50,
    fill: '#DDD',
  })

  canvasLayer.add(backgroundRect)
  canvasLayer.add(imagePlaceholderRect)

  // imageElement = new Konva.Image({
  //   image: imageElement,
  // })
  //
  // canvasLayer.add(imageElement)
  // updateImage(props.url) // Carrega a imagem inicial
})

watch(
  () => props.url,
  (newUrl) => {
    updateImage(newUrl) // Atualiza a imagem quando a URL muda
  }
)
</script>

<template>
  <div id="container"></div>
</template>
