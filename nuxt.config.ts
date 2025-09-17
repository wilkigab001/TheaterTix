// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app/',
  devtools: { enabled: true },
  css: [
    './app/assets/scss/main.scss'
  ],
  vite:{
    css:{
      preprocessorOptions:{
        scss:{}
      }
    }
  },
  runtimeConfig:{
    stripeSecretKey: process.env.STRIPE_SUPER_SECRET_KEY_SECRET_LOCAL
  },
  public:{
    stripePublishableKey: process.env.STRIPE_SUPER_SECRET_KEY_PUBLISHABLE_LOCAL
  }
})
