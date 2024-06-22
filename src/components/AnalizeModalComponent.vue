<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" text="Analiza" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Analiza maduración">
        <v-container>
          <v-row v-if="isMobile" class="pa-2"
            ><v-btn style="width: 100%" text="Haz una foto" @click="openCamara"></v-btn
            ><input
              ref="camaraImageInput"
              type="file"
              accept="image/*"
              capture="environment"
              style="display: none"
            />
          </v-row>
          <v-row class="pa-2"
            ><v-btn style="width: 100%" text="Escoge desde la galeria" @click="openGallery"></v-btn
            ><input ref="galeriaImageInput" type="file" accept="image/*" style="display: none"
          /></v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isActive = ref(false)
const galeriaImageInput = ref<HTMLInputElement | null>(null)
const camaraImageInput = ref<HTMLInputElement | null>(null)
const isMobile = ref(false)

const detectDevice = () => {
  const userAgent = navigator.userAgent
  isMobile.value = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent.toLowerCase()
  )
  console.log(isMobile.value, userAgent)
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

onMounted(() => {
  detectDevice()
})
</script>
