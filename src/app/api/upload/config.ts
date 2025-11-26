// Configuración para la ruta de upload
export const config = {
  api: {
    bodyParser: false, // Desactivar el body parser por defecto
    responseLimit: false, // Sin límite de respuesta
  },
}

// Límites de tamaño para diferentes tipos de archivo
export const FILE_SIZE_LIMITS = {
  image: 50 * 1024 * 1024, // 50MB para imágenes
  video: 100 * 1024 * 1024, // 100MB para videos
  audio: 50 * 1024 * 1024, // 50MB para audio
  default: 50 * 1024 * 1024, // 50MB por defecto
}

