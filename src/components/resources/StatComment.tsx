import { formatStat } from "@/utils/utilityFunctions";
import { CommentIcon } from "./icons";
import { LittleSkeleton } from "./skeletons";

interface Props {
  amountComments?: number;
}

export const StatComment = ({ amountComments }: Props) => {
  return (
    <>
      <CommentIcon />
      {amountComments !== undefined ? (
        <p class="select-none text-center text-sm lg:text-sm">
          {formatStat(amountComments)}
        </p>
      ) : (
        <LittleSkeleton />
      )}
    </>
  );
};
