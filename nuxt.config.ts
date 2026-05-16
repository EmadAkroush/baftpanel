// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module"],

  plugins: ["~/plugins/axios.js"],

  runtimeConfig: {
    public: {
      apiBase: "https://api.vx.business",
    },
  },

  app: {
    head: {
      title: "finalxcard",
      htmlAttrs: {
        lang: "en",
        dir: "ltr",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "",
        },
      ],
      // ✅ اضافه شد: اسکریپت Google reCAPTCHA
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js",
          async: true,
          defer: true,
        },
      ],
    },
  },

  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "@vuepic/vue-datepicker/dist/main.css", // وارد کردن استایل مستقیما در پیکربندی Nuxt
    "primeicons/primeicons.css",
  ],

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
      ripple: true,
    },
    autoImport: true,
  },

  compatibilityDate: "2025-03-08",
});
