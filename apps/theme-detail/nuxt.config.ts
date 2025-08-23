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
    }
  },
  
  // Add compatibility date
  compatibilityDate: '2025-08-13'
})
