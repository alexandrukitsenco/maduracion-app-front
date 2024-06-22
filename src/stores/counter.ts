import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('image', () => {
  const uploadedImage = ref<string | null>(null)

  const setUploadedImage = (image: string | null) => {
    uploadedImage.value = image
  }

  return {
    uploadedImage,
    setUploadedImage
  }
})
