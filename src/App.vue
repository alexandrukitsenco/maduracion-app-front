<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main style="min-height: 100vh; display: flex">
    <v-container class="mt-12" style="height: 100%">
      <RouterView />
    </v-container>
  </main>
</template>

<style>
body {
  background-color: darkslategray;
}
</style>
