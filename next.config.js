/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
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
  // Configuración de servidor para permitir archivos grandes
  serverRuntimeConfig: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
  },
}

module.exports = nextConfig
