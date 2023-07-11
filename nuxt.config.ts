import svgLoader from "vite-svg-loader";

// i18n setup
const AVAILABLE_LOCALES = ["it", "de"];
const DEFAULT_LOCALE = AVAILABLE_LOCALES[0];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image-edge", "@nuxtjs/i18n"],

  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
        },
      ],
      script: [
        {
          src: "/js/facebook-pixel.js",
        },
      ],
      noscript: [{ children: "Javascript is required" }],
    },
  },

  typescript: {
    shim: false,
  },

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_API_BASE,
        browserHttpEndpoint: process.env.NUXT_PUBLIC_API_BASE,
      },
    },
  },

  hooks: {
    "webpack:config": (configs) => {
      configs.forEach((config) => {
        const svgRule = config.module.rules.find(
          (rule: { test: { test: (arg0: string) => any } }) =>
            rule.test.test(".svg")
        );
        svgRule.test = /\.(png|jpe?g|gif|webp)$/;
        config.module.rules.push({
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /inline/,
              loader: "file-loader",
              query: {
                name: "static/image/[name].[hash:8].[ext]",
              },
            },
            {
              loader: "vue-svg-loader",
              options: {
                // Optional svgo options
                svgo: {
                  plugins: [{ removeViewBox: false }],
                },
              },
            },
          ],
        });
      });
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },

  i18n: {
    locales: AVAILABLE_LOCALES.map((localeName) => ({
      code: localeName,
      file: localeName + ".json",
    })),
    lazy: true,
    langDir: "locales",
    defaultLocale: DEFAULT_LOCALE,
    strategy: "prefix_except_default",
    vueI18n: {
      legacy: false,
      locale: DEFAULT_LOCALE,
      messages: {},
    },
  },

  vite: {
    plugins: [
      svgLoader({
        /* NOTE: add here optional config */
      }),
    ],
  },

  telemetry: false,
});
