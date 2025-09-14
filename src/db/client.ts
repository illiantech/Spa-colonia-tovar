import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";

import { getSecret } from "astro:env/server";
import { EnvFields } from "../utils/enums";

const DATABASE_URL = getSecret(EnvFields.DATABASE_URL);
const DATABASE_TOKEN = getSecret(EnvFields.DATABASE_TOKEN);

const turso = createClient({
  url: DATABASE_URL ?? "",
  authToken: DATABASE_TOKEN ?? ""
});

export const db = drizzle(turso);
