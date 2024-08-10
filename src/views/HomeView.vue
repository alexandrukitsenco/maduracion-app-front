<template>
  <v-container>
    <v-row>
      <v-select
        label="Seleccióna"
        @update:modelValue="predictionStore.setSelectedOption"
        :items="predictionStore.options"
      ></v-select>
    </v-row>
    <v-row>
      <v-btn
        @click="goToAnalyze"
        color="surface-variant"
        text="Analiza"
        variant="flat"
      ></v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePredictionStore } from '@/stores/predictionStore'

const router = useRouter()
const predictionStore = usePredictionStore()

const goToAnalyze = () => {
  router.push({ name: 'analyze' })
}
</script>