import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Option } from '@/models/predictionModels'

export const usePredictionStore = defineStore('prediction', () => {
  const options = ref<Option[]>([])
  const selectedOption = ref<Option | null>(null)

  const addOption = (option: Option) => {
    options.value.push(option)
  }

  const setSelectedOption = (optionName: string) => {
    const aux = options.value.find((option: Option) => {
      return option.title === optionName
    })
    selectedOption.value = aux
  }

  return {
    options,
    addOption,
    selectedOption,
    setSelectedOption
  }
})
