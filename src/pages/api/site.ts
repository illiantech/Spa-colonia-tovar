import type { APIRoute } from "astro";
import { schemaSites } from "@/schemas/sites";
import { findSites } from "@/services/site";
import { res } from "@/utils/utilityFunctions";

// import { createHash } from "node:crypto";
// export const generateID = (str: string) =>
//   createHash("sha256").update(str).digest("hex");

// analizar si necesito validar cuando devuelve el dato o lo ingreso en la semilla

export const GET: APIRoute = async () => {
  const SITES = await findSites();

  const validation = schemaSites.safeParse(SITES);

  if (!validation.success) {
    return res(
      JSON.stringify({
        error: "Invalid data",
        details: validation.error
      }),
      {
        status: 406
      }
    );
  }

  return res(JSON.stringify(validation.data), {
    status: 200
  });
};
