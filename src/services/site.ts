import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { Categorys, Images, Links, Sites } from "../db/schemas";
import type { TourismSite, UUID } from "../utils/types";
import { notRepeatData } from "../utils/utilityFunctions";

export const findSites = async () => {
  const { title, tlf, openingHours, location, description, id } = Sites;

  const DATA = await db
    .select({
      Images,
      Links,
      title,
      tlf,
      openingHours,
      location,
      description,
      id,
      categoryId: Categorys.id
    })
    .from(Sites)
    .innerJoin(Categorys, eq(Categorys.id, Sites.categoryId))
    .innerJoin(Images, eq(Images.siteId, Sites.id))
    .innerJoin(Links, eq(Links.siteId, Sites.id));

  const SITES = Object.values(
    DATA.reduce((acc: Record<string, TourismSite>, item) => {
      const { id, Links, Images, categoryId } = item;

      if (!acc[id])
        acc[id] = {
          id,
          title: item.title,
          tlf: item.tlf,
          openingHours: item.openingHours,
          location: item.location,
          description: item.description,
          categoryId,
          links: [],
          images: []
        } as TourismSite;

      const NOT_LINK_REPEAT = notRepeatData({
        arr: acc[id].links,
        id: Links.id as UUID
      });

      const NOT_IMAGE_REPEAT = notRepeatData({
        arr: acc[id].images,
        id: Images.id as UUID
      });

      if (NOT_LINK_REPEAT)
        acc[id].links.push({
          id: Links.id as UUID,
          url: Links.url
        });

      if (NOT_IMAGE_REPEAT)
        acc[id].images.push({
          id: Images.id as UUID,
          src: Images.src,
          alt: Images.alt
        });

      return acc;
    }, {})
  );

  return SITES;
};

export const findSiteById = async ({ payload }: { payload: string }) => {
  const { id } = Sites;

  const DATA = await db
    .select({ id })
    .from(Sites)
    .where(eq(Sites.id, payload))
    .limit(1);

  return DATA[0];
};
