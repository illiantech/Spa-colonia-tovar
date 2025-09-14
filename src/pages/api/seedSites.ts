import type { APIRoute } from "astro";
// import { generateID } from "../../utils/utilityFunctions";
import { res } from "@/utils/utilityFunctions";

export const postSeedSites: APIRoute = async () => {
  //   await db.insert(Categorys).values([
  //     { category: CategorysEnum.INN, id: generateID(CategorysEnum.INN) },
  //     { category: CategorysEnum.PLACE, id: generateID(CategorysEnum.PLACE) },
  //     {
  //       category: CategorysEnum.RESTAURANT,
  //       id: generateID(CategorysEnum.RESTAURANT)
  //     },
  //     {
  //       category: CategorysEnum.ACTIVITIES,
  //       id: generateID(CategorysEnum.ACTIVITIES)
  //     }
  //   ]);

  //   await db.insert(Sites).values([
  //     {
  //       id: generateID("site-one"),
  //       title: "hola mundo",
  //       tlf: "23232323",
  //       openingHours: "Lunes a Viernes 9:00 AM - 5:00 PM",
  //       categoryId: generateID(CategorysEnum.PLACE),
  //       location: "en la plaza",

  //       description: "lorem ipsum dolor sit amet, consectetur adipis"
  //     },
  //     {
  //       id: generateID("site-two"),
  //       title: "inn 1",
  //       categoryId: generateID(CategorysEnum.INN),
  //       tlf: "23232323",
  //       openingHours: "Lunes a Viernes 9:00 AM - 5:00 PM",
  //       location: "en la plaza",

  //       description: "lorem ipsum dolor sit amet, consectetur adipis"
  //     },
  //     {
  //       id: generateID("site-three"),
  //       title: "inn 2",
  //       categoryId: generateID(CategorysEnum.INN),
  //       tlf: "23232323",
  //       openingHours: "Lunes a Viernes 9:00 AM - 5:00 PM",
  //       location: "en la plaza",

  //       description: "lorem ipsum dolor sit amet, consectetur adipis"
  //     }
  //   ]);

  //   await db.insert(Links).values([
  //     {
  //       id: crypto.randomUUID(),
  //       url: "http://",
  //       siteId: generateID("site-one")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       url: "http://a-1",
  //       siteId: generateID("site-two")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       url: "http://b-1",
  //       siteId: generateID("site-three")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       url: "http://b-2",
  //       siteId: generateID("site-three")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       url: "http://b-3",
  //       siteId: generateID("site-three")
  //     }
  //   ]);

  //   await db.insert(Images).values([
  //     {
  //       id: crypto.randomUUID(),
  //       src: "/example.webp",
  //       alt: "example",
  //       siteId: generateID("site-one")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       src: "/example1.webp",
  //       alt: "example1",
  //       siteId: generateID("site-one")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       src: "/example2.webp",
  //       alt: "example2",
  //       siteId: generateID("site-one")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       src: "/example1.webp",
  //       alt: "example1a-1",
  //       siteId: generateID("site-two")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       src: "/example2.webp",
  //       alt: "example2a-2",
  //       siteId: generateID("site-two")
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       src: "/example2.webp",
  //       alt: "example2b-1",
  //       siteId: generateID("site-three")
  //     }
  //   ]);

  return res(JSON.stringify("succesfly"), {});
};
