import type { StateLike } from "@/utils/types";
import { formatStat } from "@/utils/utilityFunctions";
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
    <>
      <button
        onClick={handleLike}
        title={notStateLike ?? isStateLike}
        class={`aspect-square w-7 ${!handleLike && "cursor-default"} `}
      >
        <LikeIcon clase={like ? " like__active like " : "like"} />
      </button>
      {countLikes !== undefined ? (
        <p
          title={handleLike && `${countLikes} Likes`}
          class="text-shadow-lg w-fit select-none text-center text-sm lg:text-sm"
        >
          {formatStat(countLikes)}
        </p>
      ) : (
        <LittleSkeleton />
      )}
    </>
  );
};
