import { formatStat } from "@/utils/utilityFunctions";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
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

  return (
    <div class="absolute right-0 top-0 h-full">
      {filterSitesId.map((site, i) => {
        return (
          <div
            style={{
              opacity: 0,
              animation: "fade-in 300ms ease forwards",
              animationDelay: `${300 * i}ms`
            }}
            class="relative h-28 lg:h-48"
            key={site.id}
          >
            <div
              title={`${formatStat(allLikes[site.id])} Likes`}
              class="absolute bottom-1 right-14 z-50 flex w-16 scale-75 items-center gap-1.5 lg:bottom-2 lg:right-24 lg:scale-100 lg:gap-2"
            >
              <Like countLikes={allLikes[site.id]} />
            </div>
            <div
              title={`${formatStat(amountComments[site.id])} Comentarios`}
              class="absolute bottom-1 right-0 z-50 flex w-16 scale-75 items-center gap-1.5 lg:bottom-2 lg:right-4 lg:scale-100 lg:gap-2"
            >
              <StatComment amountComments={amountComments[site.id]} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
