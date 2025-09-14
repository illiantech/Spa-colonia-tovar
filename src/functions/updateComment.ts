import { edit, input, options } from "../store/featuresComment";
import { CommentActions, Methods, RoutesAPI } from "../utils/enums";
import type { ContentById, QueryComment } from "../utils/types";
import { textSpaceFormatted } from "../utils/utilityFunctions";

export const updateComment = ({ actions, setIsLoading }: QueryComment) => {
  if (edit.value) {
    setIsLoading(true);
    const COMMENT_PARSER = textSpaceFormatted(input.value.trim());

    const UPDATE_DATA: ContentById = {
      content: COMMENT_PARSER,
      id: edit.value
    };

    fetch(RoutesAPI.COMMENT, {
      method: Methods.PATCH,
      body: JSON.stringify(UPDATE_DATA)
    })
      .then((res) => {
        if (!res.ok) return;

        actions({
          type: CommentActions.UPDATE,
          others: UPDATE_DATA
        });

        options.value = undefined;
        edit.value = undefined;
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
};
