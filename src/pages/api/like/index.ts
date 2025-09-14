import type { APIRoute } from "astro";
import { schemaDeleteMedia } from "@/schemas/comment";
import {
  schemaGetLikes,
  schemaLike,
  type LikeData,
  type LikesData
} from "@/schemas/like";
import {
  deleteLikeById,
  findLikeById,
  findLikesBySite,
  giveLike
} from "@/services/like";
import { findSiteById } from "@/services/site";
import type { UUID } from "@/utils/types";
import { res } from "@/utils/utilityFunctions";

export const POST: APIRoute = async ({ request, locals }) => {
  const userId = locals.userId;

  if (!userId)
    return res(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const body = await request.json();

  const bodyWithUserId: LikeData = {
    ...body,
    userId
  };

  const validation = schemaLike.safeParse(bodyWithUserId);

  const verifySiteId = await findSiteById({
    payload: body.siteId
  });

  const likes = await findLikesBySite({ siteId: body.siteId });

  const isLike = likes.some((like) => like.userId === userId);

  if (!validation.success || isLike || !verifySiteId.id || !verifySiteId) {
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

  const like = await giveLike({ payload: validation.data });

  return res(JSON.stringify({ ...like, mesagge: "success" }), {
    status: 200
  });
};

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const userId = locals.userId;

  const id = params.get("id");

  if (!id)
    return res(
      JSON.stringify({
        error: "Invalid ID"
      }),
      {
        status: 406
      }
    );

  const infoLikes = await findLikesBySite({ siteId: id });

  const likes: LikesData = {
    count: infoLikes.length
  };

  const isYourLike = infoLikes.find((like) => like.userId === userId);

  if (isYourLike) likes.id = isYourLike.id;

  const validation = schemaGetLikes.safeParse(likes);

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

export const DELETE: APIRoute = async ({ request, locals }) => {
  const userId = locals.userId;

  if (!userId)
    return res(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const id = params.get("id");

  const validation = schemaDeleteMedia.safeParse(id);

  if (!validation.success) {
    return res(
      JSON.stringify({
        error: "Invalid ID",
        details: validation.error
      }),
      {
        status: 406
      }
    );
  }

  const existUserId = await findLikeById({ id: validation.data as UUID });

  if (existUserId.userId !== userId)
    return res(JSON.stringify({ error: "Acceso no autorizado" }), {
      status: 401
    });

  const deleted = await deleteLikeById({ id: validation.data as UUID });

  return res(JSON.stringify({ deleted }), { status: 200 });
};
