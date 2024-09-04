<template>
  <v-container style="display: flex; flex-direction: column; gap: 20px;">
    <v-row><p>Resultado del análisis de maduración {{ formattedPrediction }}</p></v-row>
    <v-row><img style="width: 100%;" v-if="imageStore.uploadedImage" :src="imageStore.uploadedImage" alt="Imagen analizada" /></v-row>
    <v-row><v-btn @click="goBack" color="primary" style="width: 100%">Volver</v-btn></v-row>        
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/imageStore'
import { computed } from 'vue'

const router = useRouter()
const imageStore = useImageStore()

const formattedPrediction = computed(() => {
  return Number(imageStore.prediction).toFixed(2)
})

const goBack = () => {
  router.push({ name: 'home' })
}
</script>