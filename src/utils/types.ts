import type { User } from "@auth/core/types";
import type { JSXInternal } from "node_modules/preact/src/jsx";
import type { Dispatch, StateUpdater } from "preact/hooks";
import type { CategorysEnum, CommentActions } from "./enums";

export interface TourismSite {
  title: string;
  images: Image[];
  categoryId: string;
  location: string;
  description: string;
  tlf?: string;
  openingHours?: string;
  links: Link[];
  readonly id: string;
}

export interface Link {
  url: string;
  id: UUID;
}

export interface Image {
  src: string;
  alt: string;
  readonly id: UUID;
}

export interface CategoryData {
  title: CategorysEnum;
  readonly id: string;
  src: string;
}

export type UserComment = Pick<User, "name" | "image">;

export interface CommentData {
  content: string;
  elapsedTime: number;
  readonly userId?: string;
  user: UserComment;
  readonly id: UUID;
}

export type UUID = `${string}-${string}-${string}-${string}`;

export interface Action {
  type: CommentActions;
  add?: CommentData;
  items?: CommentData[];
  others?: Partial<Pick<CommentData, "id" | "content">>;
}

export type ContentById = Pick<CommentData, "id" | "content">;

export interface QueryComment {
  actions: Dispatch<Action>;
  readonly id?: string;
  setIsLoading: Dispatch<StateUpdater<boolean>>;
}

export interface StateMapLike {
  readonly add: true;
  readonly remove: false;
  readonly type: "boolean";
  readonly active: 1;
  readonly desactive: 0;
}

export type StateLike = 1 | 0 | boolean;

export interface QueryLike {
  setCountLikes: Dispatch<StateUpdater<number | undefined>>;
  setLike: Dispatch<StateUpdater<StateLike>>;
  readonly id?: string;
}

export type GetElmt = (elmt: string) => HTMLElement | null;

export interface LazyInitComments {
  signal: AbortSignal;
  skip?: number;
  action: CommentActions;
  actions: Dispatch<Action>;

  readonly id: string;
}

export type StyleProps = JSXInternal.Signalish<
  string | JSXInternal.CSSProperties | undefined
>;
