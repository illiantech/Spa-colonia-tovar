import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { CategorysEnum } from "../utils/enums";

export const Categorys = sqliteTable("categorys", {
  id: text("id").primaryKey().notNull(),
  category: text("category", {
    enum: [
      CategorysEnum.INN,
      CategorysEnum.ACTIVITIES,
      CategorysEnum.PLACE,
      CategorysEnum.RESTAURANT
    ]
  }).notNull()
});

export const Sites = sqliteTable("sites", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  tlf: text("tlf"),
  openingHours: text("opening_hours"),
  categoryId: text("category_id")
    .notNull()
    .references(() => Categorys.id),
  location: text("location").notNull(),
  description: text("description").notNull()
});

// revisar que datos da google authenticated
export const Users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull()
});

export const Images = sqliteTable("images", {
  id: text("id").primaryKey().notNull(),
  siteId: text("site_id")
    .notNull()
    .references(() => Sites.id),
  src: text("src").notNull(),
  alt: text("alt").notNull()
});

export const Links = sqliteTable("links", {
  id: text("id").primaryKey().notNull(),
  siteId: text("site_id")
    .notNull()
    .references(() => Sites.id),
  url: text("url").notNull()
});

export const Comments = sqliteTable("comments", {
  id: text("id").primaryKey().notNull(),
  siteId: text("site_id")
    .notNull()
    .references(() => Sites.id),
  content: text("comment").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
  elapsedTime: integer("elapsed_time").notNull()
});

export const Likes = sqliteTable("likes", {
  id: text("id").primaryKey().notNull(),
  siteId: text("site_id")
    .notNull()
    .references(() => Sites.id),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id)
});
