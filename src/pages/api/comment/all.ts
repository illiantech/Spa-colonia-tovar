import type { APIRoute } from "astro";
import { schemaAllStats } from "@/schemas/like";
import { findCommentsByAllSite } from "@/services/comment";
import { reduceRepeatForPropertyAmount, res } from "@/utils/utilityFunctions";

export const GET: APIRoute = async () => {
  const comments = await findCommentsByAllSite();

  const commentsBySite = reduceRepeatForPropertyAmount({
    arr: comments,
    key: "siteId"
  });

  const validation = schemaAllStats.safeParse(commentsBySite);

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
