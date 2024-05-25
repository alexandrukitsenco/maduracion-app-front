<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <template v-slot:append>
        <v-btn icon="mdi-login" class="ml-2" @click="navigateToLogin"></v-btn>
      </template>
    </v-app-bar>
  </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}
</script>
