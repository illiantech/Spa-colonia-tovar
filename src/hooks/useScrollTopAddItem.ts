import { SCROLL_ADD_COMMENT, WIDTH_DESKTOP } from "@/utils/const";
import { useEffect, useRef, useState } from "preact/hooks";

export const useScrollTopAddItem = ({
  container
}: {
  container: HTMLDivElement | null;
}) => {
  const [isAddItem, setIsAddItem] = useState(false);

  const isMobile = useRef<boolean>();

  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isAddItem) return;

    root.current = document.documentElement;

    if (!container || !root.current) return;

    const HTML_DOCUMENT = root.current;

    isMobile.current = window.innerWidth < WIDTH_DESKTOP;

    if (isMobile.current) {
      setTimeout(() => {
        HTML_DOCUMENT.scrollTop = SCROLL_ADD_COMMENT;
      }, 100);
    } else container.scrollTop = SCROLL_ADD_COMMENT;

    setIsAddItem(false);
  }, [isAddItem]);

  return { setIsAddItem };
};
