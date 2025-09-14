import { useBlazeSlider } from "@/hooks/useBlazeSlider";
import { isDisbaleItemSlider } from "@/store/disbaleItemSlider";
import type { Image } from "@/utils/types";
import { useStore } from "@nanostores/preact";
import "blaze-slider/dist/blaze.css";
import { useState } from "preact/hooks";
import { LeftIcon, RightIcon } from "../resources/icons";

// dame nummeros multiplos de 5 hasta llegar a 100

export const SliderSite = ({ images }: { images: Image[] }) => {
  const [imgIndex, setImgIndex] = useState<number>(1);
  const $isDisableItemSlider = useStore(isDisbaleItemSlider);

  const { refSlider } = useBlazeSlider({
    config: {
      all: {
        draggable: true,
        slidesToShow: 1,
        slideGap: "0px"
      }
    },
    setImgIndex
  });

  const handleClick = () => {
    isDisbaleItemSlider.set(!$isDisableItemSlider);
  };

  const WIDTH_BTN = 5;

  return (
    <div class="blaze-container cursor-grab" ref={refSlider}>
      <div onClick={handleClick} class="blaze-track-container">
        <div class="blaze-track">
          {images.map((img: Image) => {
            return (
              <picture class="block aspect-square w-full">
                <img
                  loading="lazy"
                  decoding="async"
                  key={img.id}
                  class="aspect-square w-full object-cover"
                  {...img}
                />
              </picture>
            );
          })}
        </div>
      </div>

      <div
        class={`${$isDisableItemSlider && "max-lg:opacity-0"} absolute bottom-2 left-2 flex h-5 w-9 items-center justify-center rounded-lg bg-[hsla(0,0%,15%,0.8)] pb-0.5 text-xs text-white max-lg:transition-opacity lg:top-2`}
      >{`${imgIndex}/${images.length}`}</div>

      <button
        title="Anterior"
        class={`blaze-prev absolute left-2 top-2/4 h-${WIDTH_BTN} w-${WIDTH_BTN} rounded-full bg-current font-bold opacity-60 transition-opacity hover:opacity-80 ${$isDisableItemSlider && "max-lg:opacity-0"} `}
        aria-label="Go to previous slide"
      >
        <LeftIcon width={WIDTH_BTN} color="text-neutral-700" />
      </button>

      <button
        title="Siguiente"
        class={`blaze-next absolute right-2 top-2/4 h-${WIDTH_BTN} w-${WIDTH_BTN} rounded-full bg-current font-bold opacity-60 transition-opacity hover:opacity-80 ${$isDisableItemSlider && "max-lg:opacity-0"} `}
        aria-label="Go to next slide"
      >
        <RightIcon width={WIDTH_BTN} color="text-neutral-700" />
      </button>
    </div>
  );
};
