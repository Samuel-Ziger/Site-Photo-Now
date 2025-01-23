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
let frameGroup: Konva.Group
let tr: Konva.Transformer

const stageWidth = 966
const stageHeight = 1200
const imageWidth = 300
const imageHeight = 360
const frameWidth = 350
const frameHeight = 450

// Função para exportar o grupo como uma imagem
const exportAsImage = () => {
  try {
    if (tr.visible()) {
      tr.visible(false)
    }
    const dataURL = konvaStage.toDataURL({ pixelRatio: 10 })
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'exported-image.png'
    link.click()
  } catch (err) {
    console.error('Failed to export image:', err)
  }
}

const updateImage = (imageUrl: string) => {
  const imageObject = new Image()
  imageObject.crossOrigin = 'anonymous' // Permite que a imagem seja usada no canvas sem violar CORS
  imageObject.src = imageUrl + '?cache_buster=' + new Date().getTime()

  imageObject.onload = function () {
    const placeholderX = 25 // Posição X do imagePlaceholderRect
    const placeholderY = 25 // Posição Y do imagePlaceholderRect
    const placeholderWidth = imageWidth // Largura do imagePlaceholderRect
    const placeholderHeight = imageHeight // Altura do imagePlaceholderRect

    // Redimensiona a imagem para ocupar exatamente o espaço do placeholder
    imageElement.width(placeholderWidth)
    imageElement.height(placeholderHeight)

    // Posiciona a imagem exatamente em cima do placeholder
    imageElement.x(placeholderX)
    imageElement.y(placeholderY)
    imageElement.image(imageObject)

    updateAnchors(
      placeholderX,
      placeholderY,
      placeholderWidth,
      placeholderHeight
    )

    // Redesenha a camada
    canvasLayer.draw()
  }
}

function updateAnchors(x: number, y: number, width: number, height: number) {
  const topLeft = frameGroup.findOne<Konva.Circle>('.topLeft')
  const topRight = frameGroup.findOne<Konva.Circle>('.topRight')
  const bottomRight = frameGroup.findOne<Konva.Circle>('.bottomRight')
  const bottomLeft = frameGroup.findOne<Konva.Circle>('.bottomLeft')

  if (!topLeft || !topRight || !bottomRight || !bottomLeft) return

  topLeft.position({ x: x, y: y })
  topRight.position({ x: x + width, y: y })
  bottomRight.position({ x: x + width, y: y + height })
  bottomLeft.position({ x: x, y: y + height })

  canvasLayer.draw()
}

onMounted(() => {
  // Cria o estágio do Konva
  konvaStage = new Konva.Stage({
    container: 'container',
    width: stageWidth,
    height: stageHeight,
  })

  // Camada do canvas com suavização de imagem
  canvasLayer = new Konva.Layer({
    imageSmoothingEnabled: true,
  })
  konvaStage.add(canvasLayer)

  // Calcula a posição central para o frameGroup
  const centerX = (stageWidth - frameWidth) / 2
  const centerY = (stageHeight - frameHeight) / 2

  // Grupo do frame, com draggable para ser arrastável
  frameGroup = new Konva.Group({
    draggable: true,
    x: centerX, // Centraliza o frameGroup no meio do palco
    y: centerY, // Centraliza o frameGroup no meio do palco
  })

  // Cria o retângulo de fundo (background) do frame
  const backgroundRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: frameWidth,
    height: frameHeight,
    fill: '#FFFFFF',
  })

  // Cria o retângulo de placeholder para a imagem
  const imagePlaceholderRect = new Konva.Rect({
    x: 25,
    y: 25,
    width: imageWidth,
    height: imageHeight,
    fill: '#DDD',
  })

  // Adiciona o background e o placeholder ao grupo frameGroup
  frameGroup.add(backgroundRect)
  frameGroup.add(imagePlaceholderRect)

  // Cria o elemento da imagem
  imageElement = new Konva.Image({
    x: 25,
    y: 25,
    image: undefined,
    strokeWidth: 6,
    strokeEnabled: false,
    draggable: true,
  })

  frameGroup.add(imageElement)

  // Adiciona o grupo frameGroup à camada primeiro
  canvasLayer.add(frameGroup)

  tr = new Konva.Transformer({
    nodes: [imageElement],
    keepRatio: false,
    flipEnabled: true,
    anchorStrokeWidth: 10,
    borderStrokeWidth: 4,
    borderStroke: '#EC4899',
    anchorStroke: '#fbcfe8',
    anchorCornerRadius: 5,
    visible: false,
    boundBoxFunc: (oldBox, newBox) => {
      if (Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10) {
        return oldBox
      }
      return newBox
    },
  })

  canvasLayer.add(tr)

  tr.moveToTop()
  imageElement.moveToTop()

  updateImage(props.url)

  imageElement.on('click', () => {
    tr.visible(!tr.visible())
  })

  canvasLayer.draw()
})

watch(
  () => props.url,
  (newUrl) => {
    updateImage(newUrl)
  }
)
</script>

<template>
  <div id="container"></div>
  <button class="absolute top-0" @click="exportAsImage">
    Exportar como PNG
  </button>
</template>
