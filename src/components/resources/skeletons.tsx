import { VARIANT_ANIMATION_PRESENCE } from "@/utils/const";
import { motion } from "motion/react";

export const CommentSkeleton = () => {
  return (
    <>
      <article class="grid w-full animate-pulse grid-cols-[36px_1fr_.1fr] grid-rows-[36px] place-items-center items-center gap-x-3 gap-y-1">
        <div class="aspect-square w-9 rounded-full bg-neutral-700"></div>

        <div class="h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="h-2 w-full max-w-6 rounded-md bg-neutral-700"></div>
        <div class="col-start-2 h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="col-start-2 row-start-3 h-2 w-full rounded-md bg-neutral-700"></div>
      </article>
      <br />
      <article class="grid w-full animate-pulse grid-cols-[36px_1fr_.1fr] grid-rows-[36px] place-items-center items-center gap-x-3 gap-y-1">
        <div class="aspect-square w-9 rounded-full bg-neutral-700"></div>

        <div class="h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="h-2 w-full max-w-6 rounded-md bg-neutral-700"></div>
        <div class="col-start-2 h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="col-start-2 row-start-3 h-2 w-full rounded-md bg-neutral-700"></div>
      </article>
      <br />
      <article class="grid w-full animate-pulse grid-cols-[36px_1fr_.1fr] grid-rows-[36px] place-items-center items-center gap-x-3 gap-y-1">
        <div class="aspect-square w-9 rounded-full bg-neutral-700"></div>

        <div class="h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="h-2 w-full max-w-6 rounded-md bg-neutral-700"></div>
        <div class="col-start-2 h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="col-start-2 row-start-3 h-2 w-full rounded-md bg-neutral-700"></div>
      </article>
      <br />
      <article class="grid w-full animate-pulse grid-cols-[36px_1fr_.1fr] grid-rows-[36px] place-items-center items-center gap-x-3 gap-y-1">
        <div class="aspect-square w-9 rounded-full bg-neutral-700"></div>

        <div class="h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="h-2 w-full max-w-6 rounded-md bg-neutral-700"></div>
        <div class="col-start-2 h-2 w-full rounded-md bg-neutral-700"></div>

        <div class="col-start-2 row-start-3 h-2 w-full rounded-md bg-neutral-700"></div>
      </article>
    </>
  );
};

export const LittleSkeleton = () => {
  return (
    <motion.article
      variants={VARIANT_ANIMATION_PRESENCE}
      initial="initial"
      animate="animate"
      exit="exit"
      class="h-5 w-full animate-pulse rounded-md bg-neutral-700"
    ></motion.article>
  );
};
