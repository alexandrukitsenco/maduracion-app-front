<template>
    <v-container>
      <v-row>
        <h2 style="color: white;">Analiza maduración</h2>
      </v-row>
      <v-row v-if="isMobile" class="pa-2">
        <v-btn style="width: 100%" text="Haz una foto" @click="openCamara">Haz una foto</v-btn>
        <input
          ref="camaraImageInput"
          type="file"
          accept="image/*"
          capture="environment"
          style="display: none"
          @change="handleImageUpload"
        />
      </v-row>
      <v-row class="pa-2">
        <v-btn style="width: 100%" text="Escoge desde la galeria" @click="openGallery">Escoge desde la galeria</v-btn>
        <input
          ref="galeriaImageInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleImageUpload"
        />
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/imageStore'

const router = useRouter()
const imageStore = useImageStore()

const galeriaImageInput = ref<HTMLInputElement | null>(null)
const camaraImageInput = ref<HTMLInputElement | null>(null)
const isMobile = ref(false)

const detectDevice = () => {
  const userAgent = navigator.userAgent
  isMobile.value = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent.toLowerCase()
  )
}

const openGallery = () => {
  if (galeriaImageInput.value) {
    galeriaImageInput.value.click()
  }
}

const openCamara = () => {
  if (camaraImageInput.value) {
    camaraImageInput.value.click()
  }
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      imageStore.setUploadedImage(null)
      imageStore.setUploadedImage(e.target?.result as string)
      router.push({ name: 'result' })
    }
    reader.readAsDataURL(file)
  }
}

onMounted(() => {
  detectDevice()
})
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>