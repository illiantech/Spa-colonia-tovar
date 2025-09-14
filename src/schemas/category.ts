import { z } from "astro/zod";
import { CategorysEnum } from "../utils/enums";

export const schemaCategory = z.array(
  z.object({
    id: z.string().min(1).max(100),
    category: z.enum([
      CategorysEnum.ACTIVITIES,
      CategorysEnum.INN,
      CategorysEnum.PLACE,
      CategorysEnum.RESTAURANT
    ])
  })
);

export type CategoryPayload = z.infer<typeof schemaCategory>;
