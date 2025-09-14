import type { APIRoute } from "astro";
import { findCategorys } from "@/services/category";
import { schemaCategory } from "@/schemas/category";
import { res } from "@/utils/utilityFunctions";

export const GET: APIRoute = async () => {
  const CATEGORYS = await findCategorys();

  const validation = schemaCategory.safeParse(CATEGORYS);

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
