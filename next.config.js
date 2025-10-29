/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Configuraciones para evitar conflictos con OneDrive
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules', '**/.git', '**/.next'],
    }
    return config
  },
  // Desactivar generación de manifiestos que causan problemas con OneDrive
  experimental: {
    webpackBuildWorker: false,
  },
}

module.exports = nextConfig
