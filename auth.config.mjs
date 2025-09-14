import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

import { getSecret } from "astro:env/server";
import { EnvFields } from "./src/utils/enums";

const GOOGLE_CLIENT_ID = getSecret(EnvFields.GOOGLE_CLIENT_ID);
const GOOGLE_CLIENT_SECRET = getSecret(EnvFields.GOOGLE_CLIENT_SECRET);

export default defineConfig({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Guarda el ID del usuario (sub de Google) en el token
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasa el ID del token a la sesión del usuario
      session.user.id = token.id;

      return session;
    }
  }
});
