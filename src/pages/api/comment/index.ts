import type { APIRoute } from "astro";
import {
  schemaComment,
  schemaDeleteMedia,
  schemaGetComments,
  schemaPatchComment,
  schemaSkipComments
} from "@/schemas/comment";
import {
  createComment,
  deleteCommentById,
  findCommentById,
  findCommentsBySite,
  updateCommentById
} from "@/services/comment";
import { findSiteById } from "@/services/site";
import type { CommentData, UUID } from "@/utils/types";
import { res } from "@/utils/utilityFunctions";

export const POST: APIRoute = async ({ request, locals }) => {
  const userId = locals.userId;

  if (!userId)
    return res(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const body = await request.json();

  const bodyWithUserId = {
    ...body,
    userId
  };

  const validation = schemaComment.safeParse(bodyWithUserId);

  const verifySiteId = await findSiteById({
    payload: body.siteId
  });

  if (!validation.success || !verifySiteId.id || !verifySiteId)
    return res(
      JSON.stringify({
        error: "Invalid data",
        details: validation.error
      }),
      {
        status: 406
      }
    );

  const comment = await createComment({ payload: validation.data });

  return res(JSON.stringify(comment), {
    status: 200,
    statusText: "ingress data"
  });
};

export const GET: APIRoute = async ({ request, locals }) => {
  const userId = locals.userId;

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const id = params.get("id");
  const skip = params.get("skip") ?? 0;

  const validationSkipParam = schemaSkipComments.safeParse(+skip);

  if (!id || !validationSkipParam.success)
    return res(
      JSON.stringify({
        error: "Invalid DATA"
      }),
      {
        status: 406
      }
    );

  const comments = await findCommentsBySite({
    id,
    skip: validationSkipParam.data
  });

  const indicateSesionComments: CommentData[] = comments.map((comment) => ({
    content: comment.content,
    elapsedTime: comment.elapsedTime,
    id: comment.id as UUID,
    user: comment.user,
    ...(comment.userId === userId ? { userId: userId } : {})
  }));

  const validation = schemaGetComments.safeParse(indicateSesionComments);

  if (!validation.success)
    return res(
      JSON.stringify({
        error: "Invalid data",
        details: validation.error
      }),
      {
        status: 406
      }
    );

  return res(JSON.stringify(validation.data), { status: 200 });
};

export const PATCH: APIRoute = async ({ request, locals }) => {
  const userId = locals.userId;

  if (!userId)
    return res(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const body = await request.json();

  const validation = schemaPatchComment.safeParse(body);

  if (!validation.success)
    return res(
      JSON.stringify({
        error: "Invalid data",
        details: validation.error
      }),
      {
        status: 406
      }
    );

  const userIdDataBase = await findCommentById({
    id: validation.data.id as UUID
  });

  if (userIdDataBase.userId !== userId)
    return res(JSON.stringify({ error: "Acceso no autorizado" }), {
      status: 401
    });

  const update = await updateCommentById(validation.data);

  return res(JSON.stringify(update), {
    status: 200,
    statusText: "ingress data"
  });
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const userId = locals.userId;

  if (!userId)
    return res(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const id = params.get("id");

  const validation = schemaDeleteMedia.safeParse(id);

  if (!validation.success)
    return res(
      JSON.stringify({
        error: "Invalid ID",
        details: validation.error
      }),
      {
        status: 406
      }
    );

  const existUserId = await findCommentById({ id: validation.data as UUID });

  if (existUserId.userId !== userId)
    return res(JSON.stringify({ error: "Acceso no autorizado" }), {
      status: 401
    });

  const deleted = await deleteCommentById({ id: validation.data as UUID });

  return res(JSON.stringify({ deleted }), { status: 200 });
};
