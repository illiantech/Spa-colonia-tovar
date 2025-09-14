import { z } from "astro/zod";

export const schemaLike = z.object({
  id: z.string().uuid().min(1).max(100),
  siteId: z.string().min(1).max(100),
  userId: z.string().min(1).max(100)
});

export type LikeData = z.infer<typeof schemaLike>;

export const schemaGetLikes = z.object({
  count: z.number().nonnegative().readonly(),

  id: z.string().uuid().min(1).max(100).optional()
});

export type LikesData = z.infer<typeof schemaGetLikes>;

export const schemaAllStats = z.record(
  z.string().min(1).max(100),
  z.number().nonnegative().readonly()
);

export type AllStats = z.infer<typeof schemaAllStats>;
