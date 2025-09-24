import type { Dispatch, StateUpdater } from "preact/hooks";
import { input } from "../store/featuresComment";
import { sessionStore } from "../store/session";
import { CommentActions, Methods, RoutesAPI } from "../utils/enums";
import type { QueryComment } from "../utils/types";

import { textSpaceFormatted } from "../utils/utilityFunctions";

interface Props extends QueryComment {
  setIsAddItem: Dispatch<StateUpdater<boolean>>;
}

export const addComment = ({
  id,
  actions,
  setIsLoading,
  setIsAddItem
}: Props) => {
  setIsLoading(true);

  const COMMENT_POST = {
    content: textSpaceFormatted(input.value.trim()),
    elapsedTime: Date.now(),
    siteId: id,
    id: crypto.randomUUID()
  };

  fetch(RoutesAPI.COMMENT, {
    body: JSON.stringify(COMMENT_POST),
    method: Methods.POST
  })
    .then(async (res) => {
      if (!res.ok) return;

      const { userId } = await res.json();

      const COMMENT_RENDER = {
        content: COMMENT_POST.content,
        elapsedTime: COMMENT_POST.elapsedTime,
        user: {
          name: sessionStore.get().name,
          image: sessionStore.get().image
        },
        id: COMMENT_POST.id,
        userId: userId
      };

      actions({
        type: CommentActions.ADD,
        add: COMMENT_RENDER
      });

      setIsAddItem(true);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    })
    .finally(() => {
      setIsLoading(false);
      input.value = "";
    });
};
