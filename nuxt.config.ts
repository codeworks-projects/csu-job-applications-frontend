// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image-edge"],

  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [{ src: "https://awesome-lib.js" }],
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

  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.spacex.land/graphql",
        browserHttpEndpoint: "https://api.spacex.land/graphql",
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

  telemetry: false,
});
