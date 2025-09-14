import { db } from "../db/client";
import { Categorys } from "../db/schemas";
import type { CategoryPayload } from "../schemas/category";

export const findCategorys = async (): Promise<CategoryPayload> => {
  const DATA = await db.select().from(Categorys);

  return DATA;
};
