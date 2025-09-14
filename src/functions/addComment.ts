import { input } from "../store/featuresComment";
import { sessionStore } from "../store/session";
import { SCROLL_ADD_COMMENT, WIDTH_DESKTOP } from "../utils/const";
import { CommentActions, Methods, RoutesAPI } from "../utils/enums";
import type { QueryComment } from "../utils/types";

import { textSpaceFormatted } from "../utils/utilityFunctions";

interface Props extends QueryComment {
  container: HTMLDivElement;
}

export const addComment = ({ id, actions, container, setIsLoading }: Props) => {
  setIsLoading(true);

  const isMobile = window.innerWidth < WIDTH_DESKTOP;
  const root = document.firstElementChild;

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

      // Arreglar scroll smooth en mobile
      if (isMobile && root) root.scrollTop = SCROLL_ADD_COMMENT;
      else container.scrollTop = SCROLL_ADD_COMMENT;
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
