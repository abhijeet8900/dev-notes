import "./note.scss";

import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";

import { setLocalNotes, getLocalNotes } from "../../utils/notes";
import { themeSwitcher, getDefaultTheme } from "../../utils/theme";
import Menus from "../menus";
import { Theme } from "../../constants/themes";
import cx from 'classnames'

const defaultTheme = getDefaultTheme();

const Note: React.FC = () => {
  const [text, setText] = useState("");
  const [autoSaveNotes] = useDebounce(text, 5000);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const menus = [
    {
      label: "Theme",
      onClick: () => {
        const newTheme: Theme = themeSwitcher(theme);
        setTheme(newTheme);
      },
    },
    {
      label: "Font",
      onClick: () => {
        console.log("Font");
      },
    },
    {
      label: "Mark",
      onClick: () => {
        console.log("Mark");
      },
    },
    {
      label: "Save",
      onClick: () => {
        console.log("Save");
      },
    },
  ];

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
    <div className={cx(`note-container`, theme.className)}>
      <ReactQuill
        className="note"
        placeholder="Type your text...."
        theme="bubble"
        value={text}
        onChange={onChange}
      />
      <Menus menus={menus} />
    </div>
  );
};

export default Note;
