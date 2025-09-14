import { useLike } from "@/hooks/useLike";
import { isDisbaleItemSlider } from "@/store/disbaleItemSlider";
import { useStore } from "@nanostores/preact";
import { Like } from "../resources/Like";

export const SiteLike = ({ id }: { id: string }) => {
  const { countLikes, handleLike, like } = useLike({ id });
  const $isDisableItemSlider = useStore(isDisbaleItemSlider);

  return (
    <div
      class={`max-lg:animate-fade-in lg:bottom-22 lg:-right-22 lg:w-18 absolute bottom-2 right-2 z-10 flex flex-col items-center gap-1 max-lg:transition-opacity lg:z-50 lg:flex-row lg:gap-2 ${$isDisableItemSlider && "max-lg:opacity-0"}`}
    >
      <Like countLikes={countLikes} handleLike={handleLike} like={like} />
    </div>
  );
};
