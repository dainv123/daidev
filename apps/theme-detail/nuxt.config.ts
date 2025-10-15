// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Minimal configuration for theme display
  devtools: { enabled: false },
  
  // Disable SSR for theme display
  ssr: false,
  
  // Simple app config
  app: {
    head: {
      title: 'Theme Detail - Daidev',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  
  // Fix Vite configuration
  vite: {
    server: {
      port: 3004,
      strictPort: true
    },
    optimizeDeps: {
      include: ['vue']
    }
  },
  
  // Add compatibility date
  compatibilityDate: '2025-01-13',
  
  // Runtime config
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.daidev.click/api/v1',
      appName: process.env.NUXT_APP_NAME || 'Daidev Portfolio'
    }
  }
})
