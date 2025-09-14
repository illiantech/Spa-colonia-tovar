import "blaze-slider/dist/blaze.css";
import { useBlazeSlider } from "../hooks/useBlazeSlider";

import { mappingSlideWithElmtCenter } from "@/utils/utilityFunctions";
import { useMemo, useRef, useState } from "preact/hooks";
import { categorySitesStore } from "../store/categorySitesStore";
import type { CategoryData } from "../utils/types";
import { LeftIcon, RightIcon } from "./resources/icons";

export const SliderCategory = ({
  categorys
}: {
  categorys: CategoryData[];
}) => {
  const [imgIndex, setImgIndex] = useState<number>(1);
  const refIndexDisplaceElmt = useRef<number>(1);

  const AMOUNT_CATEGORY = categorys.length;

  const { refSlider, controlSliderRef } = useBlazeSlider({
    config: {
      all: {
        draggable: true,
        slidesToShow: 3,
        slideGap: "10px"
      }
    },
    setImgIndex,
    refIndexDisplaceElmt,
    amountElmt: AMOUNT_CATEGORY
  });

  const handleCategory = (e: MouseEvent) => {
    const { target } = e;

    if (!(target instanceof HTMLElement)) return;

    const newIndex = +(target.dataset.index || 2);
    const currentIndex = refIndexDisplaceElmt.current;

    if (newIndex === currentIndex) return;

    if (currentIndex === AMOUNT_CATEGORY - 1 && newIndex === 0) {
      controlSliderRef.current?.next();
      return;
    }

    if (currentIndex === 0 && newIndex === AMOUNT_CATEGORY - 1) {
      controlSliderRef.current?.prev();
      return;
    }

    if (newIndex > currentIndex) controlSliderRef.current?.next();
    else controlSliderRef.current?.prev();
  };

  const indexElmtCenter = useMemo(
    () =>
      mappingSlideWithElmtCenter({
        amountElmt: AMOUNT_CATEGORY,
        slideIndex: imgIndex
      }),
    [imgIndex]
  );

  categorySitesStore.value = categorys[indexElmtCenter].id; // DOES / IT not shoot render for all components

  const WIDTH_BTN = 3;
  const SM_BTN = 2;
  const LG_BTN = 3;

  return (
    <div class="blaze-slider relative" ref={refSlider}>
      <div class="blaze-container cursor-grab">
        <div class="blaze-track-container">
          <div class="blaze-track min-h-60 items-center sm:h-[450px] lg:h-[550px]">
            {categorys.map(({ id, title, src }: CategoryData, i) => {
              return (
                <figure
                  key={id}
                  data-index={i}
                  onClick={handleCategory}
                  title={title}
                  class={`mask-b-from-70% l group relative scale-95 p-1 transition-transform sm:p-3 md:scale-100 lg:p-12 ${categorySitesStore.value === id && "scale-125 md:scale-125"}`}
                >
                  <img
                    data-index={i}
                    loading="lazy"
                    decoding="async"
                    class={`mask-b-from-20% w-full object-cover brightness-75 transition-all group-hover:brightness-90 ${categorySitesStore.value === id && "brightness-90"}`}
                    src={src}
                    alt={title}
                  />
                  <figcaption
                    data-index={i}
                    class="top-2/5 text-shadow-lg absolute left-0 w-full text-center text-xs font-semibold sm:text-base lg:text-2xl"
                  >
                    {title}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      <button
        title="Anterior"
        class={`blaze-prev absolute -left-6 top-2/4 h-${WIDTH_BTN} w-${WIDTH_BTN} font-bold opacity-60 transition-opacity hover:opacity-80 sm:-left-10 sm:h-${SM_BTN} sm:w-${SM_BTN} lg:h-${LG_BTN} lg:w-${LG_BTN}`}
        aria-label="Go to previous slide"
      >
        <LeftIcon
          width={WIDTH_BTN}
          sm={SM_BTN}
          lg={LG_BTN}
          color="text-neutral-200"
        />
      </button>

      <button
        title="Siguiente"
        class={`blaze-next absolute -right-6 top-2/4 h-${WIDTH_BTN} w-${WIDTH_BTN} font-bold opacity-60 transition-opacity hover:opacity-80 sm:-right-10 sm:h-${SM_BTN} sm:w-${SM_BTN} lg:h-${LG_BTN} lg:w-${LG_BTN}`}
        aria-label="Go to next slide"
      >
        <RightIcon
          width={WIDTH_BTN}
          sm={SM_BTN}
          lg={LG_BTN}
          color="text-neutral-200"
        />
      </button>
    </div>
  );
};
