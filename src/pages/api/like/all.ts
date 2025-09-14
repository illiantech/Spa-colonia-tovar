import type { APIRoute } from "astro";
import { schemaAllStats } from "@/schemas/like";
import { findLikesByAllSites } from "@/services/like";
import { reduceRepeatForPropertyAmount, res } from "@/utils/utilityFunctions";

export const GET: APIRoute = async () => {
  const likes = await findLikesByAllSites();

  const likesBySite = reduceRepeatForPropertyAmount({
    arr: likes,
    key: "siteId"
  });

  const validation = schemaAllStats.safeParse(likesBySite);

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

  return res(JSON.stringify(validation.data), { status: 200 });
};
