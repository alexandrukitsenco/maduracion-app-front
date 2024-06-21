<template>
  <v-container>
    <v-row><v-select label="Seleccióna" :items="['Aceituna', 'mandarina']"></v-select></v-row>
    <v-row><analize-modal-component></analize-modal-component></v-row>
    <v-row>
      <v-col cols="7" style="padding-left: 0px"
        >guardar los datospara mejorar calidad de resultados</v-col
      >
      <v-col cols="5" style="padding-right: 0"><v-switch label="guardar"></v-switch></v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import AnalizeModalComponent from '@/components/AnalizeModalComponent.vue'
</script>
