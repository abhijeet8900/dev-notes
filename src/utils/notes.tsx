import { DeltaStatic } from "quill";
/**
 * Get notes stored in localstorage of browser
 * @returns {String} Notes
 */
export const getLocalNotes = (): DeltaStatic | string => {
  let notes: DeltaStatic | string = "";
  if (
    typeof window !== "undefined" &&
    window.localStorage.getItem("dev-util-notes")
  ) {
    const notesString = window.localStorage.getItem("dev-util-notes");
    notes =
      typeof notesString == "string" && notesString.length > 0
        ? JSON.parse(notesString)
        : {};
  }
  return notes;
};

/**
 * Stores notes in localstorage of browser
 * @param notes Notes to store in localstorage
 */
export const setLocalNotes = (notes: DeltaStatic | string | undefined) => {
  window.localStorage.setItem("dev-util-notes", JSON.stringify(notes));
};
