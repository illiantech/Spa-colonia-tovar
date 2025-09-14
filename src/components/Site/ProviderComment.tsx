import type { ComponentChildren } from "preact";
import { createContext, useReducer } from "preact/compat";
import { type Dispatch } from "preact/hooks";
import { CommentActions } from "@/utils/enums";
import type { Action, CommentData } from "@/utils/types";

interface Props {
  children: ComponentChildren;
}

export const CommentsContext = createContext<CommentData[] | undefined>([]);
export const CommentActionsContext = createContext<Dispatch<Action>>(
  ({}) => {}
);

export const PorviderComment = ({ children }: Props) => {
  const [comments, actions] = useReducer(commentActions, undefined);

  return (
    <CommentsContext.Provider value={comments}>
      <CommentActionsContext.Provider value={actions}>
        {children}
      </CommentActionsContext.Provider>
    </CommentsContext.Provider>
  );
};

const commentActions = (
  comments: CommentData[] | undefined,
  actions: Action
) => {
  const { add, others, type, items } = actions;

  switch (type) {
    case CommentActions.ADD: {
      if (add && comments) return [add, ...comments];
    }

    case CommentActions.INITIAL: {
      if (items) return items;
    }

    case CommentActions.LAZY_LOAD: {
      if (comments && items) return [...comments, ...items];
    }

    case CommentActions.UPDATE: {
      return comments?.map((comment) =>
        comment.id === others?.id ? { ...comment, ...others } : comment
      );
    }

    case CommentActions.DELETE: {
      return comments?.filter((comment) => comment.id !== others?.id);
    }

    default: {
      throw Error("Unknown action: " + actions.type);
    }
  }
};
