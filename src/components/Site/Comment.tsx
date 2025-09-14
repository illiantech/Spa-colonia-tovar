import { AnimatePresence, motion, MotionValue } from "motion/react";
import { type MutableRef } from "preact/hooks";
import { useCommentOption } from "@/hooks/useCommentOptions";
import { edit, options } from "@/store/featuresComment";
import {
  MENU_OPTIONS,
  VARIANT_ANIMATION_COMMENT_EDIT,
  VARIANT_ANIMATION_COMMENT_OPTIONS,
  VARIANT_ANIMATION_COMMMENT
} from "@/utils/const";
import type { CommentData } from "@/utils/types";
import { formatterElapsedTime } from "@/utils/utilityFunctions";

interface Props extends CommentData {
  refInput: MutableRef<string>;
  firstLoad: MotionValue<boolean>;
}

export const Comment = ({
  content,
  user,
  elapsedTime,
  refInput,
  id,
  userId,

  firstLoad
}: Props) => {
  const VERIFY_EDIT = edit.value === id;
  const VERIFY_OPTIONS = id === options.value;

  const { handleDelete, handleEdit, handleOptions } = useCommentOption({
    id,

    content,
    refInput
  });

  return (
    <motion.article
      variants={VARIANT_ANIMATION_COMMMENT}
      initial={firstLoad.get() ? "firstInitial" : "initial"}
      animate={firstLoad.get() ? "firstAnimate" : "animate"}
      onAnimationComplete={() => {
        firstLoad.set(false);
      }}
      exit="exit"
      layoutId={id}
      layout="position"
      data-comment
      class="mb-12 grid grid-cols-[.2fr_1fr_.1fr] grid-rows-[36px] items-center gap-y-0.5 text-sm"
    >
      <div class="flex justify-center">
        <img
          class="aspect-square w-9 rounded-full"
          src={user.image as string}
          alt="Avatar"
        />
      </div>
      <h4 class="flex flex-col items-start ps-2 font-bold">
        {user.name}
        <AnimatePresence>
          {VERIFY_EDIT && (
            <motion.div
              variants={VARIANT_ANIMATION_COMMENT_EDIT}
              initial="hidden"
              animate="visible"
              exit="hidden"
              class="pe-0 text-xs font-normal opacity-60"
            >
              Editando
            </motion.div>
          )}
        </AnimatePresence>
      </h4>
      <div class="relative grid place-content-center">
        {userId && (
          <button
            data-comment-options={MENU_OPTIONS}
            onClick={handleOptions}
            title="Opciones del comentario"
            class="select-none ps-2 text-2xl opacity-60 transition-opacity hover:opacity-100"
          >
            ...
          </button>
        )}
        <AnimatePresence>
          {VERIFY_OPTIONS && (
            <motion.div
              variants={VARIANT_ANIMATION_COMMENT_OPTIONS}
              initial="hidden"
              animate="visible"
              exit="hidden"
              data-comment-options={MENU_OPTIONS}
              class="absolute -right-0.5 top-8 z-30 flex w-24 flex-col gap-2 rounded-md border border-neutral-700 bg-neutral-900 py-2 text-xs shadow-lg"
            >
              <button
                data-comment-options={MENU_OPTIONS}
                onClick={handleDelete}
                title="Eliminar comentario"
                class="font-bold text-red-500"
              >
                Eliminar
              </button>
              <hr
                data-comment-options={MENU_OPTIONS}
                class="w-full border-neutral-700"
              />

              <button
                data-comment-options={MENU_OPTIONS}
                onClick={handleEdit}
                title="Editar comentario"
                class="font-bold"
              >
                {VERIFY_EDIT ? "No editar" : "Editar"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <br />
      <p class="min-w-48 break-words ps-2">{content}</p>

      <br />
      <time class="col-start-2 ps-2 text-xs opacity-60">
        {formatterElapsedTime(elapsedTime)}
      </time>
    </motion.article>
  );
};
