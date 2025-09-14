import { z } from "astro/zod";

export const schemaComment = z.object({
  id: z.string().uuid().min(1).max(100),
  content: z.string().min(1).max(200),
  elapsedTime: z.number().positive(),
  siteId: z.string().min(1).max(100),
  userId: z.string().min(1).max(100)
});

export const schemaSkipComments = z.number().nonnegative().int();

export const schemaGetComments = z.array(
  z.object({
    id: z.string().uuid().min(1).max(100),

    content: z.string().min(1).max(200),
    elapsedTime: z.number().positive(),
    userId: z.string().min(1).max(100).optional(),
    user: z.object({
      name: z.string().min(1).max(100),
      image: z.string().min(1).max(100)
    })
  })
);

export const schemaPatchComment = z.object({
  id: z.string().uuid().min(1).max(100),
  content: z.string().min(1).max(200)
});

export const schemaDeleteMedia = z.string().uuid();

export type CommentPayload = z.infer<typeof schemaComment>;
