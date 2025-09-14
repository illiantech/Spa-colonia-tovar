import { Signal } from "@preact/signals";
import { useEffect, useRef, type Dispatch } from "preact/compat";
import type { MutableRef, StateUpdater } from "preact/hooks";
import type { UUID } from "../utils/types";

interface PropsCloseWithInWindow {
  dataset: string;
  setState:
    | Signal<boolean | undefined | UUID>
    | Dispatch<StateUpdater<boolean | undefined | UUID>>;
  state?: boolean | UUID;
}

interface ReturnCloseWithInWindow {
  refClickInWindow?: MutableRef<boolean>;
}

type UseCloseWithClickInWindow = (
  props: PropsCloseWithInWindow
) => ReturnCloseWithInWindow;

export const useCloseWithClickInWindow: UseCloseWithClickInWindow = ({
  setState,
  dataset,
  state
}) => {
  const refClickInWindow = useRef<boolean>(false);

  useEffect(() => {
    const handleRemoveMenuOptions = (e: MouseEvent) => {
      const { target } = e;

      if (!(target instanceof HTMLElement) || target.dataset[dataset]) return;

      setState instanceof Signal ? (setState.value = state) : setState(state);
      refClickInWindow.current = true;
    };

    window.addEventListener("click", handleRemoveMenuOptions);

    return () => {
      window.removeEventListener("click", handleRemoveMenuOptions);
    };
  }, []);

  return { refClickInWindow };
};
