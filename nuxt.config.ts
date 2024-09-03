// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // head
    head: {
      title: 'API Fiscal',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'API Fiscal',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  alias: {
    '#types': '/types',
    '#lang': '/lang',
  },

  css: ['~/assets/scss/index.scss'],

  runtimeConfig: {
    public: {
      apiUrl:
        process.env.NUXT_APP_API_URL || 'https://api.apifiscal.com.br/v1',
    },
  },

  ssr: false,
  devtools: { enabled: true },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element/index.scss" as element;',
        },
      },
    },
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
  ],

  pinia: {
    autoImports: [['defineStore', 'definePiniaStore']],
  },

  elementPlus: {
    importStyle: 'scss',
  },
  compatibilityDate: '2024-09-02',
})