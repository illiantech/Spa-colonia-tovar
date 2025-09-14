import { mappingSlideWithElmtCenter } from "@/utils/utilityFunctions";
import BlazeSlider, { type BlazeConfig } from "blaze-slider";

import {
  useEffect,
  useRef,
  type Dispatch,
  type MutableRef,
  type StateUpdater
} from "preact/hooks";

interface Props {
  config: BlazeConfig;
  setImgIndex?: Dispatch<StateUpdater<number>>;
  refIndexDisplaceElmt?: MutableRef<number>;
  amountElmt?: number;
}

export function useBlazeSlider({
  config,
  setImgIndex,
  refIndexDisplaceElmt,
  amountElmt
}: Props) {
  const controlSliderRef = useRef<BlazeSlider>(null);
  const refSlider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if not already initialized
    if (!controlSliderRef.current && refSlider.current) {
      controlSliderRef.current = new BlazeSlider(refSlider.current, config);

      if (setImgIndex)
        controlSliderRef.current.onSlide((pageIndex) => {
          // ref img match can with current img index in some slide
          if (refIndexDisplaceElmt && amountElmt)
            refIndexDisplaceElmt.current = mappingSlideWithElmtCenter({
              amountElmt,
              slideIndex: pageIndex + 1
            });

          setImgIndex(pageIndex + 1);
        });
    }

    return () => {
      controlSliderRef.current?.destroy();
    };
  }, []);

  return { refSlider, controlSliderRef };
}
