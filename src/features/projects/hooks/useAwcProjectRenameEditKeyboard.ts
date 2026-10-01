import { useEffect, type RefObject } from "react";

const useAwcProjectRenameEditKeyboard = (
  isEditing: boolean,
  cancelEditing: () => void,
  inputRef: RefObject<HTMLInputElement | null>,
): void => {
  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelEditing();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [cancelEditing, inputRef, isEditing]);
};

export default useAwcProjectRenameEditKeyboard;
