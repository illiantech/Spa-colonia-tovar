import { ROOT } from "astro:env/client";
import type { StateMapLike } from "./types";

export const MAX_INPUT = 200;

export const ALLOWED_ORIGINS = [ROOT];

export const ORIGIN_HEADERS = "origin";

export const STATE_MAP_LIKE: StateMapLike = {
  add: true,
  remove: false,
  active: 1,
  desactive: 0,
  type: "boolean"
};

export const TIME_DEBOUNCE = 500;

export const CLOSE_MODAL = "close";

export const ENTER = "Enter";

export const MENU_OPTIONS = true;

export const WIDTH_DESKTOP = 1024;

export const SCROLL_ADD_COMMENT = 0;

export const VARIANT_ANIMATION_PRESENCE = {
  initial: { opacity: 0, transition: { duration: 0.2 } },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const VARIANT_ANIMATION_COMMMENT = {
  initial: {
    opacity: 0,
    height: 0,
    margin: 0,
    transition: { duration: 0.2 }
  },

  firstInitial: {
    opacity: 0
  },
  firstAnimate: {
    opacity: 1
  },
  animate: {
    opacity: 1,
    height: "auto",
    margin: "0 0 48px 0",
    transition: { duration: 0.2 }
  },

  exit: { opacity: 0, height: 0, margin: 0, transition: { duration: 0.2 } }
};

export const VARIANT_ANIMATION_COMMENT_OPTIONS = {
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.15, ease: "ease" }
  },

  hidden: {
    opacity: 0,
    transform: "translateY(-5px)",
    transition: { duration: 0.15, ease: "ease" }
  }
};

export const VARIANT_ANIMATION_COMMENT_EDIT = {
  visible: {
    opacity: 1,
    height: 16,
    transition: { duration: 0.1 }
  },
  hidden: { opacity: 0, height: 0, transition: { duration: 0.1 } }
};

export const LAYOUT_ID_NOT_MORE_ITEMS = "LAYOUT_ID_NOT_MORE_ITEMS";
