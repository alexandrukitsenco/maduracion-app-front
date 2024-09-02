import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dotMultiply, sum, add } from 'mathjs'
import { usePredictionStore } from './predictionStore'

export const useImageStore = defineStore('image', () => {
  const uploadedImage = ref<string | null>(null)
  const histogramas = ref<number[] | null>(null)
  const prediction = ref<number | null>(null)
  const predictionStore = usePredictionStore()

  const setUploadedImage = async (image: string | null) => {
    uploadedImage.value = image
    if (image) {
      try {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image;
        });
        const hist = await calcularHistogramas(image)
        histogramas.value = hist
        prediction.value = calcularPrediccion(hist, predictionStore.selectedOption.regresion, predictionStore.selectedOption.b0)
      } catch (error) {
        console.error('Error al cargar o procesar la imagen:', error);
      }
    } else {
      histogramas.value = null
      prediction.value = null
    }
  }

  const calcularHistogramas = async (imageSrc: string): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = imageSrc
      img.crossOrigin = 'Anonymous'

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
  
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        const data = imageData.data
  
        const histogramas = {
          R: new Array(64).fill(0),
          G: new Array(64).fill(0),
          B: new Array(64).fill(0)
        }
  
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

  
          histogramas.R[Math.floor(r / 4)]++
          histogramas.G[Math.floor(g / 4)]++
          histogramas.B[Math.floor(b / 4)]++
        }
  
        const resultado = [...histogramas.R, ...histogramas.G, ...histogramas.B];
        resolve(resultado)
      }
  
      img.onerror = (error) => {
        console.error('Error al cargar la imagen:', error);
        reject(new Error('Error al cargar la imagen: ' + error))
      }
    })
  }

  const calcularPrediccion = (histograma: number[], regresion: number[], b0: number): number => {
    const resultado = add(sum(dotMultiply(histograma, regresion)), b0);
    return resultado;
  }

  return {
    uploadedImage,
    prediction,
    setUploadedImage
  }
})
