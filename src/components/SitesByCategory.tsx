import { useEffect, useMemo, useRef } from "preact/hooks";
import { categorySitesStore } from "../store/categorySitesStore";

interface Props {
  // ARREGLAR TYPE SITE CATEGORY
  children: any;
}

export const SitesByCategory = ({ children }: Props) => {
  const refWrapperSite = useRef<HTMLDivElement>(null);
  const refTimeoutAnimationSites = useRef<NodeJS.Timeout>();
  const htmlString = children?.props.value as string;

  const sitesMap = htmlString
    .split("</a>")
    .filter((site) => site)
    .map((site) => `${site}</a>`);

  const filterSites = useMemo(
    () =>
      categorySitesStore.value
        ? sitesMap
            .filter((site) =>
              site.includes(`data-category-site="${categorySitesStore.value}"`)
            )
            .join("")
        : sitesMap.join(""),
    [categorySitesStore.value]
  );

  useEffect(() => {
    if (!refWrapperSite.current) return;

    const wrapperSite = refWrapperSite.current;

    wrapperSite.innerHTML = filterSites;

    refTimeoutAnimationSites.current = setTimeout(() => {
      Array.from(wrapperSite.children).forEach((item, i) => {
        item.classList.remove("opacity-0");
        item.classList.add("opacity-100");
        (item as HTMLElement).style.transitionDelay = `${i * 150}ms`;
      });
    }, 100);

    return () => {
      if (refTimeoutAnimationSites.current)
        clearTimeout(refTimeoutAnimationSites.current);
    };
  }, [categorySitesStore.value]);

  return (
    <div
      ref={refWrapperSite}
      class="flex w-full flex-col flex-wrap gap-x-1 gap-y-0 overflow-auto"
    ></div>
  );
};
