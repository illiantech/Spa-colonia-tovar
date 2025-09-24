import { VARIANT_ANIMATION_PRESENCE } from "@/utils/const";
import { formatStat } from "@/utils/utilityFunctions";
import { AnimatePresence, motion } from "motion/react";
import { CommentIcon } from "./icons";
import { LittleSkeleton } from "./skeletons";

interface Props {
  amountComments?: number;
}

export const StatComment = ({ amountComments }: Props) => {
  return (
    <AnimatePresence>
      <CommentIcon />
      {amountComments !== undefined ? (
        <motion.p
          variants={VARIANT_ANIMATION_PRESENCE}
          animate="animate"
          initial="initial"
          exit="exit"
          class="select-none text-center text-sm lg:text-sm"
        >
          {formatStat(amountComments)}
        </motion.p>
      ) : (
        <LittleSkeleton />
      )}
    </AnimatePresence>
  );
};
