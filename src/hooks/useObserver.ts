import type { RefObject } from "preact";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type StateUpdater
} from "preact/hooks";

interface PropsObserver<T> {
  state: T;
  dataset: string;
}

interface ReturnObserver {
  visibleItem: boolean;
  notMoreItems?: boolean;
  setNotMoreItems?: Dispatch<StateUpdater<boolean>>;
  itemToObserver: RefObject<HTMLElement>;
}

type UseObserver = <T>(
  props: PropsObserver<T>,
  options: IntersectionObserverInit
) => ReturnObserver;

export const useObserver: UseObserver = ({ state, dataset }, options) => {
  const [visibleItem, setVisibleItem] = useState(false);
  const [notMoreItems, setNotMoreItems] = useState(false);
  const itemToObserver = useRef<HTMLElement>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        console.log(`IsIntesecting: ${entry.isIntersecting}`);
        setVisibleItem(true);
      }
    }, options);
  }, []);

  useEffect(() => {
    const item = itemToObserver.current;

    const lastChildItem = item?.lastElementChild ?? item;

    if (
      !(lastChildItem instanceof HTMLElement) ||
      !dataset ||
      !lastChildItem.dataset[dataset]
    )
      return;

    if (notMoreItems) return;

    observer.observe(lastChildItem);

    return () => {
      setVisibleItem(false);
      observer.disconnect();
    };
  }, [state, notMoreItems]);

  return { visibleItem, itemToObserver, notMoreItems, setNotMoreItems };
};
