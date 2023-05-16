import { useEffect, RefObject } from "react";

/**
 * Do something when click outside the DOM.
 * @param dom
 * @param cb - Callback function, fires on click-outside event. If it changes too often, wrap it's definition in useCallback.
 */
export const useClickOutside = (
  dom: RefObject<HTMLElement>,
  cb: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dom.current?.contains(e.target as Element)) cb();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dom, cb]);
};
