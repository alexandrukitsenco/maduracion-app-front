<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <HeaderComponent />
  <main class="mt-12">
    <RouterView />
  </main>
</template>

<style>
body {
  background-color: darkslategray;
  margin: 16px; /* Margen base para dispositivos pequeños */
}

/* Márgenes responsivos */
@media (min-width: 576px) {
  body {
    margin: 24px; /* Margen para pantallas pequeñas */
  }
}

@media (min-width: 768px) {
  body {
    margin: 32px; /* Margen para pantallas medianas */
  }
}

@media (min-width: 992px) {
  body {
    margin: 40px; /* Margen para pantallas grandes */
  }
}

@media (min-width: 1200px) {
  body {
    margin: 48px; /* Margen para pantallas extra grandes */
  }
}
</style>
