<template>
  <v-container>
    <v-row><v-select label="Seleccióna" :items="['Aceituna', 'mandarina']"></v-select></v-row>
    <v-row
      ><v-btn
        @click="openAnalyzeDialog"
        color="surface-variantd"
        text="Analiza"
        variant="flat"
      ></v-btn
    ></v-row>
    <v-row>
      <v-col cols="7" style="padding-left: 0px"
        >guardar los datospara mejorar calidad de resultados</v-col
      >
      <v-col cols="5" style="padding-right: 0"><v-switch label="guardar"></v-switch></v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="analizeDialog" transition="dialog-bottom-transition" fullscreen>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" @click="analizeDialog = false"></v-btn>
    </v-toolbar>
    <analize-component
      v-if="currentPage === DialogPages.ANALYZE"
      @image-uploaded="updatePage(DialogPages.RESULT)"
    />
    <result-component @close="analizeDialog = false" v-if="currentPage === DialogPages.RESULT" />
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AnalizeComponent from '@/components/AnalizeComponent.vue'
import ResultComponent from '@/components/ResultComponent.vue'

enum DialogPages {
  ANALYZE = 'analize',
  RESULT = 'result'
}

const updatePage = (page: DialogPages) => {
  currentPage.value = page
}

const openAnalyzeDialog = () => {
  analizeDialog.value = true
  currentPage.value = DialogPages.ANALYZE
}

const currentPage = ref(DialogPages.ANALYZE)
const analizeDialog = ref(false)
</script>
