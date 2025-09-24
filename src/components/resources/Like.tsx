import { VARIANT_ANIMATION_PRESENCE } from "@/utils/const";
import type { StateLike } from "@/utils/types";
import { formatStat } from "@/utils/utilityFunctions";
import { AnimatePresence, motion } from "motion/react";
import { LikeIcon } from "./icons";
import { LittleSkeleton } from "./skeletons";

interface Props {
  countLikes?: number;
  handleLike?: () => void;
  like?: StateLike;
}

export const Like = ({ countLikes, handleLike, like }: Props) => {
  const isStateLike = like ? "Me gusta" : "Dar me gusta";

  const notStateLike = handleLike === undefined ? "" : undefined;
  return (
    <AnimatePresence>
      <button
        onClick={handleLike}
        title={notStateLike ?? isStateLike}
        class={`aspect-square w-7 ${!handleLike && "cursor-default"} `}
      >
        <LikeIcon clase={like ? " like__active like " : "like"} />
      </button>
      {countLikes !== undefined ? (
        <motion.p
          variants={VARIANT_ANIMATION_PRESENCE}
          initial="initial"
          animate="animate"
          exit="exit"
          title={handleLike && `${countLikes} Likes`}
          class="text-shadow-lg select-none text-center text-sm lg:text-sm"
        >
          {formatStat(countLikes)}
        </motion.p>
      ) : (
        <LittleSkeleton />
      )}
    </AnimatePresence>
  );
};
