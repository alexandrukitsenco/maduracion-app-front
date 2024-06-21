<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" text="Analiza" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Analiza maduración">
        <v-container>
          <v-row class="pa-2"
            ><v-btn style="width: 100%" text="Haz una foto" @click="console.log('foto')"></v-btn
          ></v-row>
          <v-row class="pa-2"
            ><v-btn
              style="width: 100%"
              text="Escoge desde la galeria"
              @click="console.log('galeria')"
            ></v-btn
          ></v-row>
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
import { ref } from 'vue'
const isActive = ref(false)
</script>
