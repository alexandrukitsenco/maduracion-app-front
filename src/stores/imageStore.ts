import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dotMultiply, sum, add } from 'mathjs'

const regresion: number[] = [
  -2.17e-9, -1.38e-9, 8.87e-9, 4.18e-8, 7.91e-8, 9.73e-8, 1.28e-7, 1.82e-7, 2.38e-7, 2.78e-7,
  2.93e-7, 2.92e-7, 2.9e-7, 2.82e-7, 2.73e-7, 2.63e-7, 2.52e-7, 2.39e-7, 2.23e-7, 2.1e-7, 1.9e-7,
  1.74e-7, 1.56e-7, 1.29e-7, 1.05e-7, 8.34e-8, 6.65e-8, 5.36e-8, 3.91e-8, 2.92e-8, 6.81e-9,
  -1.07e-8, -2.88e-8, -4.65e-8, -6.46e-8, -8.05e-8, -9.36e-8, -1.06e-7, -1.24e-7, -1.4e-7, -1.59e-7,
  -1.68e-7, -1.85e-7, -1.95e-7, -1.96e-7, -2.02e-7, -2.04e-7, -2.08e-7, -2.04e-7, -1.8e-7, -1.85e-7,
  -1.71e-7, -1.59e-7, -1.49e-7, -1.29e-7, -1.13e-7, -9.45e-8, -7.95e-8, -5.75e-8, -3.23e-8, -1.0e-8,
  7.4e-9, 2.25e-8, 9.45e-8, 1.71e-9, 6.22e-9, 3.41e-8, 9.65e-8, 1.65e-7, 2.17e-7, 2.67e-7, 3.11e-7,
  3.51e-7, 3.71e-7, 3.55e-7, 3.51e-7, 3.51e-7, 3.46e-7, 3.27e-7, 3.11e-7, 2.94e-7, 2.78e-7, 2.7e-7,
  2.65e-7, 2.35e-7, 2.29e-7, 2.13e-7, 2.13e-7, 1.96e-7, 1.64e-7, 1.44e-7, 1.18e-7, 9.52e-8, 7.65e-8,
  5.15e-8, 3.29e-8, 1.98e-8, 2.07e-8, -7.58e-9, -2.89e-8, -4.76e-8, -6.13e-8, -7.88e-8, -8.08e-8,
  -1.08e-7, -1.23e-7, -1.43e-7, -1.61e-7, -1.76e-7, -1.84e-7, -1.85e-7, -2.16e-7, -2.28e-7,
  -2.31e-7, -2.74e-7, -2.88e-7, -3.06e-7, -3.07e-7, -3.25e-7, -3.28e-7, -3.21e-7, -3.25e-7,
  -3.23e-7, -2.84e-7, -2.76e-7, -2.17e-7, -1.45e-7, 5.31e-8, -8.57e-8, -5.9e-8, -8.64e-8, -9.75e-8,
  -8.81e-8, -5.46e-8, -2.06e-8, 2.94e-8, 5.69e-8, 7.98e-8, 1.05e-7, 1.17e-7, 1.03e-7, 9.76e-8,
  9.8e-8, 8.21e-8, 7.72e-8, 7.42e-8, 4.38e-8, 3.77e-8, 2.24e-8, 2.55e-8, 8.24e-9, 1.31e-8, -5.02e-9,
  -3.02e-8, -3.9e-8, -4.83e-8, -3.63e-8, -3.89e-8, -4.88e-8, -5.64e-8, -4.4e-8, -5.04e-8, -4.83e-8,
  -3.59e-8, -5.34e-8, -4.48e-8, -2.84e-8, -1.65e-8, -5.73e-9, 2.27e-8, 4.25e-8, 4.23e-8, 5.02e-8,
  5.86e-8, 7.12e-8, 7.67e-8, 7.54e-8, 8.19e-8, 7.45e-8, 7.12e-8, 6.81e-8, 6.48e-8, 5.64e-8, 4.89e-8,
  4.21e-8, 3.64e-8, 3.06e-8, 2.47e-8, 1.95e-8, 1.46e-8, 1.28e-8, 1.51e-8
]

const b0: number = 2.311428571428572

export const useImageStore = defineStore('image', () => {
  const uploadedImage = ref<string | null>(null)
  const histogramas = ref<number[] | null>(null)
  const prediction = ref<number | null>(null)

  const setUploadedImage = async (image: string | null) => {
    uploadedImage.value = image
    if (image) {
      const hist = await calcularHistogramas(image)
      histogramas.value = hist
      prediction.value = calcularPrediccion(hist, regresion, b0)
    } else {
      histogramas.value = null
      prediction.value = null
    }
  }

  const calcularHistogramas = async (imageSrc: string): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = imageSrc
      img.crossOrigin = 'Anonymous' // Para evitar problemas de CORS si la imagen está en otro dominio.

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

          // Asegúrate de que el índice esté en el rango adecuado
          histogramas.R[Math.floor(r / 4)]++
          histogramas.G[Math.floor(g / 4)]++
          histogramas.B[Math.floor(b / 4)]++
        }

        // Concatenar los histogramas y resolver la promesa
        resolve([...histogramas.R, ...histogramas.G, ...histogramas.B])
      }

      img.onerror = (error) => {
        reject(new Error('Error al cargar la imagen: ' + error))
      }
    })
  }

  const calcularPrediccion = (histograma: number[], regresion: number[], b0: number): number => {
    return add(sum(dotMultiply(histograma, regresion)), b0)
  }

  return {
    uploadedImage,
    histogramas,
    prediction,
    setUploadedImage
  }
})
