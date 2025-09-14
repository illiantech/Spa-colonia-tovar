import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
  env: {
    schema: {
      ROOT: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321"
      }),
      DATABASE_URL: envField.string({
        context: "server",
        access: "secret"
      }),
      DATABASE_TOKEN: envField.string({
        context: "server",
        access: "secret"
      }),
      GOOGLE_CLIENT_ID: envField.string({
        context: "server",
        access: "secret"
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret"
      }),
      AUTH_SECRET: envField.string({
        context: "server",
        access: "secret"
      }),
      AUTH_TRUST_HOST: envField.boolean({
        context: "server",
        access: "public",
        default: true
      })
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [preact({ compat: true }), auth()],
  devToolbar: {
    enabled: false
  },

  // site: "https://illiantech.github.io",
  // base: "spa_colonia_tovar"
  adapter: vercel({})
});
