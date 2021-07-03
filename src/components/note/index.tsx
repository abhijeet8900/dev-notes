import "./note.scss";

import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";

import { setLocalNotes, getLocalNotes } from "../../utils/notes";

const Note = () => {
  const [text, setText] = useState("");
  const [autoSaveNotes] = useDebounce(text, 5000);

  /** Store notes in localstorage*/
  useEffect(() => {
    setLocalNotes(text);
  }, [autoSaveNotes]);

  /** Set inital notes if available */
  useEffect(() => {
    const localNotes = getLocalNotes();
    setText(localNotes);
  }, []);

  const onChange = (value: string) => {
    setText(value);
  };

  return (
    <div>
      <ReactQuill
        className="note"
        placeholder="Type your text...."
        theme="bubble"
        value={text}
        onChange={onChange}
      />
    </div>
  );
};

export default Note;
