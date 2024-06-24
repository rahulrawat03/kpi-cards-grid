import { RefObject, useCallback, useEffect } from "react";

export function useClickOutside<T, S extends HTMLElement = HTMLElement>(
  cb: () => T,
  contentRef: RefObject<S>
) {
  const handleClick = useCallback(
    (event: Event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        cb();
      }
    },
    [cb, contentRef]
  );

  useEffect(() => {
    const node = document;

    if (node) {
      node.addEventListener("click", handleClick);

      return () => {
        node.removeEventListener("click", handleClick);
      };
    }
  }, [handleClick]);
}
