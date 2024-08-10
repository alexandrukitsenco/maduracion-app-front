<script setup lang="ts">
import { RouterView } from 'vue-router'
import { usePredictionStore } from '@/stores/predictionStore'
import type { Option } from '@/models/predictionModels'
import { onMounted } from 'vue'

const { addOption } = usePredictionStore()

function processRegression(data: any): { [key: string]: number[] } {
  const result: { [key: string]: number[] } = {};
  
  data.forEach((record: any) => {
    Object.keys(record.fields).forEach((key) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key] = record.fields[key].split(', ').map(Number);
    });
  });

  return result;
}

function processB0(data: any): { [key: string]: number } {
  const result: { [key: string]: number } = {};
  
  data.forEach((record: any) => {
    Object.keys(record.fields).forEach((key) => {
      result[key] = parseFloat(record.fields[key]);
    });
  });

  return result;
}

async function fetchAirtableData(baseId, tableId, apiKey) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error('Error al hacer la llamada a Airtable:', error);
    throw error;
  }
}

const BASE_ID = 'appCAXi2bTF8Hrjru';
const TABLE_ID_REGRESION = 'tblKLJjBhjlDOIFyQ';
const TABLE_ID_B0 = 'tbl62OpDaAQv6CjEm';
const API_KEY = import.meta.env.VITE_API_KEY;

const getData = async () => {
  try {
    const regressionRecords = await fetchAirtableData(BASE_ID, TABLE_ID_REGRESION, API_KEY);
    const b0Records = await fetchAirtableData(BASE_ID, TABLE_ID_B0, API_KEY);

    const regressionValues = processRegression(regressionRecords);
    const b0Values = processB0(b0Records);

    const options: Option[] = Object.keys(regressionValues).map((title) => ({
      title,
      regresion: regressionValues[title],
      b0: b0Values[title]
    }));
    
    options.forEach(option => addOption(option));
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

onMounted(() => {
  getData();
})
</script>

<template>
  <main style="min-height: 100vh; display: flex">
    <v-container class="mt-12" style="height: 100%">
      <RouterView />
    </v-container>
  </main>
</template>

<style>
body {
  background-color: darkslategray;
  color: white
}
</style>

