import type { GetElmt, UUID } from "./types";

export const transitionViewIfSupported = (updateCb: () => void) => {
  if (document.startViewTransition) {
    return document.startViewTransition(updateCb);
  } else {
    updateCb();
  }
};

// example but funtinal code IA (Tabnine)
export const formatterElapsedTime = (time: number) => {
  const elapsed = Math.abs(Date.now() - time);
  if (elapsed < 60000) {
    return `${Math.floor(elapsed / 1000)} s`;
  } else if (elapsed < 3600000) {
    return `${Math.floor(elapsed / 60000)} m`;
  } else if (elapsed < 86400000) {
    return `${Math.floor(elapsed / 3600000)} h`;
  } else if (elapsed < 2592000000) {
    return `${Math.floor(elapsed / 86400000)} d`;
  } else {
    return `${Math.floor(elapsed / 604800000)} sem`;
  }
};

// funtion parser stat in 1k, 1.5k, 10k, 100k, 1M
export const formatStat = (stat: number) => {
  if (stat < 1000) return `${stat}`;
  if (stat < 10000) return `${(stat / 1000).toFixed(1)}k`;
  if (stat < 100000) return `${Math.floor(stat / 1000)}k`;
  if (stat < 1000000) return `${stat / 1000}k`;
  return `${Math.floor(stat / 1000000)}M`;
};
// reduce data model when relational data base is 1-N
export const notRepeatData = ({ arr, id }: { arr: { id: UUID }[]; id: UUID }) =>
  arr.every((item) => item.id !== id);

// routes response shorthand function
export const res = (
  body: string | null,
  {
    status,
    statusText,
    headers
  }: { status?: number; statusText?: string; headers?: HeadersInit }
) => new Response(body, { status, statusText, headers });

export const $: GetElmt = (elmt: string) => document.getElementById(elmt);

export const textSpaceFormatted = (text?: string) =>
  text ? text.replace(/\s+/g, " ") : "";

export const reduceRepeatForPropertyAmount = ({
  arr,
  key
}: {
  arr: Record<string, string>[] | string[];
  key?: string;
}) =>
  arr.reduce(
    (acc, currentItem) => {
      const id =
        typeof currentItem === "object"
          ? currentItem[key ?? "id"]
          : currentItem;

      acc[id] = (acc[id] ?? 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );

export const mappingSlideWithElmtCenter = ({
  amountElmt,
  slideIndex
}: {
  amountElmt: number;
  slideIndex: number;
}): number => (slideIndex === amountElmt ? 0 : slideIndex);
