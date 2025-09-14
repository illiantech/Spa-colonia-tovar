import { WIDTH_DESKTOP } from "@/utils/const";
import type { StyleProps } from "@/utils/types";
import { formatStat } from "@/utils/utilityFunctions";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "preact/hooks";
import type { AllStats } from "../schemas/like";
import { categorySitesStore } from "../store/categorySitesStore";
import { Methods, RoutesAPI } from "../utils/enums";
import { Like } from "./resources/Like";
import { StatComment } from "./resources/StatComment";

interface Props {
  SITES_ID: { id: string; category: string }[];
}

export const WrapperViewStats = ({ SITES_ID }: Props) => {
  const [allLikes, setAllLikes] = useState<AllStats>({});
  const [amountComments, setAmountComments] = useState<AllStats>({});
  const refIsMobile = useRef<number>();

  const filterSitesId = useMemo(
    () =>
      categorySitesStore.value
        ? SITES_ID.filter((site) => site.category === categorySitesStore.value)
        : SITES_ID,
    [categorySitesStore.value]
  );

  useEffect(() => {
    refIsMobile.current = window.innerWidth;

    const controller = new AbortController();
    const { signal } = controller;

    fetch(RoutesAPI.ALL_LIKES, {
      method: Methods.GET,
      signal
    }).then(async (res) => {
      if (!res.ok) return;
      const data: AllStats = await res.json();

      setAllLikes(data);
    });

    fetch(RoutesAPI.ALL_COMMENTS, {
      method: Methods.GET,
      signal
    }).then(async (res) => {
      if (!res.ok) return;
      const data: AllStats = await res.json();

      setAmountComments(data);
    });

    return () => {
      controller.abort();
    };
  }, []);

  const variablePropertiesOfStats = useCallback(
    ({
      index,
      initial
    }: {
      index: number;
      initial: StyleProps;
    }): StyleProps => {
      if (refIsMobile.current && typeof initial === "object")
        return refIsMobile.current < WIDTH_DESKTOP
          ? { ...initial, top: `${112 * (index + 1) - 28}px` }
          : { ...initial, top: `${192 * (index + 1) - 34}px` };
    },
    [refIsMobile.current]
  );

  return (
    <div class="absolute top-0 w-full">
      {filterSitesId.map((site, i) => {
        return (
          <div
            style={variablePropertiesOfStats({
              index: i,
              initial: {
                opacity: 0,
                animation: "fade-in 300ms ease forwards",
                animationDelay: `${300 * i}ms`
              }
            })}
            class="absolute top-0 w-full"
            key={site.id}
          >
            <div
              title={`${formatStat(allLikes[site.id])} Likes`}
              class="absolute -right-1 z-50 grid scale-75 grid-cols-2 grid-rows-1 items-center gap-0.5 lg:right-1 lg:scale-100"
            >
              <Like countLikes={allLikes[site.id]} />
            </div>
            <div
              title={`${formatStat(amountComments[site.id])} Comentarios`}
              class="absolute right-12 z-50 grid scale-75 grid-cols-2 grid-rows-1 items-center gap-0.5 lg:right-20 lg:scale-100"
            >
              <StatComment amountComments={amountComments[site.id]} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
