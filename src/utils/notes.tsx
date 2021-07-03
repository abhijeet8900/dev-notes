/**
 * Get notes stored in localstorage of browser
 * @returns {String} Notes
 */
export const getLocalNotes = (): string => {
  if (
    typeof window !== "undefined" &&
    window.localStorage.getItem("dev-util-notes")
  ) {
    return window.localStorage.getItem("dev-util-notes") ?? "";
  }
  return "";
};

/**
 * Stores notes in localstorage of browser
 * @param notes Notes to store in localstorage
 */
export const setLocalNotes = (notes: string) => {
  window.localStorage.setItem("dev-util-notes", notes);
};
