import { lazyInitComments } from "@/functions/lazyCommentsInit";
import { useCloseWithClickInWindow } from "@/hooks/useCloseWithClickInWindow";
import { useObserver } from "@/hooks/useObserver";
import { options } from "@/store/featuresComment";
import {
  LAYOUT_ID_NOT_MORE_ITEMS,
  VARIANT_ANIMATION_COMMMENT
} from "@/utils/const";
import { CommentActions } from "@/utils/enums";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import type { ComponentChildren } from "preact";
import { useContext, useEffect, useRef } from "preact/compat";
import { CommentSkeleton } from "../resources/skeletons";
import { Comment } from "./Comment";
import { FormComment } from "./FormComment";
import { CommentActionsContext, CommentsContext } from "./ProviderComment";

interface Props {
  children: ComponentChildren;
  id: string;
}

export const Content = ({ id, children }: Props) => {
  const comments = useContext(CommentsContext);
  const actions = useContext(CommentActionsContext);
  const refContainerAside = useRef<HTMLDivElement>(null);
  const refInput = useRef<string>("");
  const firstLoad = useMotionValue(true);

  useCloseWithClickInWindow({
    dataset: "commentOptions",
    setState: options,
    state: undefined
  });

  const { setNotMoreItems, notMoreItems, visibleItem, itemToObserver } =
    useObserver({ state: comments, dataset: "comment" }, { threshold: 0 });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (comments && visibleItem)
      lazyInitComments({
        signal,
        action: CommentActions.LAZY_LOAD,
        id,
        actions,
        skip: comments.length
      }).then((res) => {
        if (res && setNotMoreItems) setNotMoreItems(true);
      });

    return () => {
      controller.abort();
    };
  }, [visibleItem]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!comments)
      lazyInitComments({ signal, action: CommentActions.INITIAL, id, actions });

    return () => {
      controller.abort();
    };
  }, []);

  const isComment = comments !== undefined && comments.length > 0;

  const notFoundComment = comments !== undefined && comments.length === 0;

  const fallbackComment = comments === undefined;

  return (
    <div class="justify-between bg-neutral-950 lg:relative lg:col-start-2 lg:row-span-full lg:rounded-br-md lg:rounded-tr-md">
      <div
        ref={refContainerAside}
        class="mb-14 lg:absolute lg:h-full lg:w-full lg:overflow-scroll lg:scroll-smooth"
      >
        {children}

        <section
          ref={itemToObserver}
          class="mb-18 border-t border-neutral-700 p-6 lg:mb-28"
        >
          <AnimatePresence>
            {isComment &&
              comments.map((comment) => {
                return (
                  <Comment
                    firstLoad={firstLoad}
                    refInput={refInput}
                    key={comment.id}
                    {...comment}
                  />
                );
              })}

            {notMoreItems && !notFoundComment && (
              <motion.div
                exit="exit"
                initial="initial"
                animate="animate"
                layoutId={LAYOUT_ID_NOT_MORE_ITEMS + id}
                layout="position"
                variants={VARIANT_ANIMATION_COMMMENT}
                class="w-full text-center text-lg"
              >
                No se encuentran mas comentarios
              </motion.div>
            )}
          </AnimatePresence>

          {notFoundComment && (
            <div class="my-16 w-full animate-pulse text-center text-xl">
              ¡Escribe el primer comentario!
            </div>
          )}

          {fallbackComment && <CommentSkeleton />}
        </section>
      </div>
      <FormComment
        refInput={refInput}
        refContainerAside={refContainerAside}
        id={id}
      />
    </div>
  );
};
