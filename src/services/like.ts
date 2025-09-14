import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { Likes } from "../db/schemas";
import type { LikeData } from "../schemas/like";
import type { UUID } from "../utils/types";

export const giveLike = async ({ payload }: { payload: LikeData }) => {
  const DATA = await db.insert(Likes).values(payload).returning({
    id: Likes.id,
    siteId: Likes.siteId
  });

  return DATA[0];
};

export const findLikesBySite = async ({ siteId }: { siteId: string }) => {
  const DATA = await db.select().from(Likes).where(eq(Likes.siteId, siteId));

  return DATA;
};

export const findLikesByAllSites = async () => {
  const DATA = await db.select({ siteId: Likes.siteId }).from(Likes);

  return DATA;
};

export const deleteLikeById = async ({ id }: { id: UUID }) => {
  const DATA = await db.delete(Likes).where(eq(Likes.id, id)).returning({
    id: Likes.id,
    userId: Likes.userId
  });

  return DATA[0];
};

export const findLikeById = async ({ id }: { id: UUID }) => {
  const DATA = await db.select().from(Likes).where(eq(Likes.id, id)).limit(1);

  return DATA[0];
};
