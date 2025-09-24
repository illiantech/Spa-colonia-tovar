import { useContext, useEffect, useState, type MutableRef } from "preact/hooks";
import { CommentActionsContext } from "../components/Site/ProviderComment";
import { edit, input, options } from "../store/featuresComment";
import { CommentActions, Methods, RoutesAPI } from "../utils/enums";
import type { ContentById } from "../utils/types";
import { textSpaceFormatted } from "../utils/utilityFunctions";

interface Props extends ContentById {
  refInput: MutableRef<string>;
}

export const useCommentOption = ({ content, id, refInput }: Props) => {
  const actions = useContext(CommentActionsContext);
  const [erasing, setErasing] = useState<boolean>(false);

  const IS_OPTIONS = options.value === id;
  const NOT_OPTIONS = options.value === undefined;
  const DISTINTC_OPTIONS = options.value !== id;

  const IS_EDIT = edit.value === id;
  const NOT_EDIT = edit.value === undefined;
  const DISTINTC_EDIT = edit.value !== id;

  const handleDelete = () => {
    if (!erasing) {
      setErasing(true);

      fetch(`${RoutesAPI.COMMENT}?id=${id}`, {
        method: Methods.DELETE
      })
        .then((res) => {
          if (!res.ok) return;

          actions({ type: CommentActions.DELETE, others: { id } });
          options.value = undefined;

          // deleteMessageStore.value = true;

          // clearTimeout(timeoutDeleteMessageStore.value);

          // timeoutDeleteMessageStore.value = setTimeout(() => {
          //   deleteMessageStore.value = false;
          // }, 2500);
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        })
        .finally(() => {
          setErasing(false);
          edit.value = undefined;
        });
    }
  };

  const handleOptions = () => {
    if (NOT_OPTIONS && DISTINTC_EDIT) {
      options.value = id;
      edit.value = undefined;
      return;
    }

    if (NOT_OPTIONS) {
      options.value = id;
      return;
    }

    if (IS_OPTIONS) {
      options.value = undefined;
      return;
    }

    if (DISTINTC_OPTIONS) {
      edit.value = undefined;
      options.value = id;
      return;
    }
  };

  const handleEdit = () => {
    if (NOT_EDIT) {
      edit.value = id;
      return;
    }

    if (IS_EDIT) {
      edit.value = undefined;
      return;
    }
  };

  useEffect(() => {
    if (NOT_EDIT) {
      input.value = ""; // arreglar bug en lazy load
      refInput.current = "";
      return;
    }

    if (IS_EDIT) {
      const contentFormatted = textSpaceFormatted(content);

      input.value = contentFormatted;
      refInput.current = contentFormatted;
    }
  }, [edit.value]);

  return { handleDelete, handleEdit, handleOptions };
};
