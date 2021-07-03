import { useState } from "react";
import ReactQuill from "react-quill";
import "./note.scss";

function Note({  }) {
  const [text, setText] = useState("");
  const onChange = (value) => {
    setText(value);
  };
  return (
    <ReactQuill
      className="note"
      placeholder="Type your text...."
      theme="bubble"
      value={text}
      onChange={onChange}
    />
  );
}

export default Note;
