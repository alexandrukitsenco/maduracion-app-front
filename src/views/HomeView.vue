<template>
  <v-container>
    <v-row>
      <v-select
        label="Seleccióna"
        v-model="selectedOption"
        :items="predictionStore.options"
      ></v-select>
    </v-row>
    <v-row>
      <v-btn
        style="width: 100%;"
        @click="goToAnalyze"
        color="surface-variant"
        text="Analiza"
        variant="flat"
        :disabled="!selectedOption"
      ></v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePredictionStore } from '@/stores/predictionStore'
import { ref, watch, onMounted } from 'vue'

const router = useRouter()
const predictionStore = usePredictionStore()

const selectedOption = ref<string | null>(null)

onMounted(() => {
  predictionStore.setSelectedOption(null)
})

watch(selectedOption, (newValue) => {
  console.log('La opción seleccionada ha cambiado:', newValue)
  predictionStore.setSelectedOption(newValue)
})

const goToAnalyze = () => {
  router.push({ name: 'analyze' })
}
</script>