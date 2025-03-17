const config = require('./developer.json')
const siteTitle = `${config.name} | ${config.role}`


/*
 * Nuxt 3 Config File
 Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-02-28',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: "cloudflare-pages"
  },
  
  app: {
    
    head: {
      // htmlAttrs: {
      //   lang: 'en', // App language
      // },
      title: siteTitle, // App window nav title
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        { 
          name: 'theme-color', 
          content: '#010C15' 
        },
      ],

      link: [
        { rel: 'icon', href: '/favicon.ico' },  // Favicon
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },  // Apple touch icon
        { rel: 'manifest', href: '/manifest.json' }
      ],
    },
  },

  /**
   * * Nuxt 3 Modules
   * Official modules: https://nuxt.com/modules
   */
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  components: {
    dirs: [
      '~/components',
    ],
  },
  
  /**
   * * Tailwind CSS Config
   * Options: https://tailwindcss.nuxt.dev/getting-started/options/
   * Docs: https://tailwindcss.nuxt.dev
   */
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true, // true to resolve the tailwind config in runtime. https://tailwindcss.nuxt.dev/getting-started/options/#exposeconfig
    injectPosition: 0,
    viewer: false,
  },


  /**
   * * Runtime Config (Environment Variables)
   * Usage: https://nuxt.com/docs/guide/going-further/runtime-config
   */
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',

    }
  }
})