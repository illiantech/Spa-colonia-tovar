import { z } from "astro/zod";

export const schemaSession = z
  .object({
    name: z.string().min(1).max(100).optional().nullable(),
    image: z.string().min(1).max(100).optional().nullable(),
    email: z.string().email().min(1).max(100).optional().nullable()
  })
  .nullable();

export type SessionState = z.infer<typeof schemaSession>;
