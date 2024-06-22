<template>
  <v-card title="Resultados">
    <v-container>
      <v-row v-if="imageStore.uploadedImage" class="pa-2">
        <img
          :src="imageStore.uploadedImage"
          alt="Imagen subida"
          style="width: 100%; max-width: 400px"
        />
        <v-card-text>La maduracion es de 80% </v-card-text>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-btn color="success" @click="$emit('close')">aceptar</v-btn>
      <v-btn color="success" @click="$emit('close')">ayudar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { useImageStore } from '@/stores/counter'
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const imageStore = useImageStore()
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
