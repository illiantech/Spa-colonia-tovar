import { z } from "astro/zod";

export const schemaSites = z.array(
  z.object({
    id: z.string().min(1).max(100),
    title: z.string().min(1).max(100),
    tlf: z.string().min(1).max(100).optional(),
    categoryId: z.string().min(1).max(100),
    openingHours: z.string().min(1).max(100).optional(),
    location: z.string().min(1).max(100),
    description: z.string().min(1),
    links: z.array(
      z.object({
        url: z.string().url().min(1).max(200),
        id: z.string().uuid().min(1).max(100)
      })
    ),
    images: z.array(
      z.object({
        src: z.string().min(1).max(100),
        alt: z.string().min(1).max(100),
        id: z.string().uuid().min(1).max(100)
      })
    )
  })
);
