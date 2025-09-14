import { Methods, RoutesAPI } from "../utils/enums";
import type { CommentData, LazyInitComments } from "../utils/types";

export const lazyInitComments = async ({
  signal,
  skip,
  actions,
  action,
  id
}: LazyInitComments) => {
  try {
    const res = await fetch(`${RoutesAPI.COMMENT}?id=${id}&skip=${skip ?? 0}`, {
      method: Methods.GET,
      signal
    });

    if (!res.ok) return;

    const COMMENTS_DATA: CommentData[] = await res.json();

    if (COMMENTS_DATA.length === 0 && skip && skip > 0) return COMMENTS_DATA;

    actions({ type: action, items: COMMENTS_DATA });
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
