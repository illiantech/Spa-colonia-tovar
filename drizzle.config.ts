// /// <reference path="./.astro/types.d.ts" />

import { getSecret } from "astro:env/server";
import { EnvFields } from "./src/utils/enums";

const DATABASE_URL = getSecret(EnvFields.DATABASE_URL);
const DATABASE_TOKEN = getSecret(EnvFields.DATABASE_TOKEN);

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: DATABASE_URL ?? "",
    authToken: DATABASE_TOKEN ?? ""
  }
} satisfies Config;
