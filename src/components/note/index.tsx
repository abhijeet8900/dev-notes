import "./note.scss";

import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce/lib";

import { setLocalNotes, getLocalNotes } from "../../utils/notes";

const Note = () => {
  const [text, setText] = useState("");

  /** Store notes in localstorage*/
  useEffect(() => {
    setTimeout(() => {
      const localNotes = getLocalNotes();
      if (text != localNotes) {
        setLocalNotes(text);
      }
    }, 3000);
  }, [text]);

  /** Set inital notes if available */
  useEffect(() => {
    const localNotes = getLocalNotes();
    setText(localNotes);
  }, []);

  const onChange = useDebouncedCallback((value: string) => {
    setText(value);
  }, 1000);

  return (
    <ReactQuill
      className="note"
      placeholder="Type your text...."
      theme="bubble"
      value={text}
      onChange={onChange}
    />
  );
};

export default Note;
