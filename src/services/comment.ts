import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { Comments, Sites, Users } from "../db/schemas";
import { type CommentPayload } from "../schemas/comment";
import type { UUID } from "../utils/types";

export const createComment = async ({
  payload
}: {
  payload: CommentPayload;
}): Promise<CommentPayload> => {
  const DATA = await db.insert(Comments).values(payload).returning({
    id: Comments.id,
    content: Comments.content,
    elapsedTime: Comments.elapsedTime,
    userId: Comments.userId,
    siteId: Comments.siteId
  });

  return DATA[0];
};

export const findCommentsBySite = async ({
  id,
  skip
}: {
  id: string;
  skip: number;
}) => {
  const DATA = await db
    .select({
      id: Comments.id,
      content: Comments.content,
      elapsedTime: Comments.elapsedTime,
      user: {
        name: Users.name,
        image: Users.image
      },
      userId: Comments.userId
    })
    .from(Comments)
    .innerJoin(Users, eq(Comments.userId, Users.id))
    .innerJoin(Sites, eq(Comments.siteId, Sites.id))
    .where(eq(Comments.siteId, id))
    .orderBy(desc(Comments.elapsedTime))
    .limit(20)
    .offset(skip);

  return DATA;
};

export const findCommentsByAllSite = async () => {
  const DATA = await db.select({ siteId: Comments.siteId }).from(Comments);

  return DATA;
};

export const updateCommentById = async ({
  id,
  content
}: {
  id: string;
  content: string;
}) => {
  const DATA = await db
    .update(Comments)
    .set({ content })
    .where(eq(Comments.id, id))
    .returning({
      id: Comments.id,
      content: Comments.content,
      userId: Comments.userId
    });

  return DATA[0];
};

export const deleteCommentById = async ({ id }: { id: UUID }) => {
  const DATA = await db.delete(Comments).where(eq(Comments.id, id)).returning({
    id: Comments.id,
    content: Comments.content,
    userId: Comments.userId
  });

  return DATA[0];
};

export const findCommentById = async ({ id }: { id: UUID }) => {
  const DATA = await db
    .select()
    .from(Comments)
    .where(eq(Comments.id, id))
    .limit(1);

  return DATA[0];
};
