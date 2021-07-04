import "./note.scss";

import cx from "classnames";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";

import Menus from "../menus";
import { Font } from "../../constants/fonts";
import { Theme } from "../../constants/themes";
import { setLocalNotes, getLocalNotes } from "../../utils/notes";
import { fontSwitcher, getDefaultFont } from "../../utils/fonts";
import { themeSwitcher, getDefaultTheme } from "../../utils/theme";

const defaultTheme = getDefaultTheme();
const defaultFont = getDefaultFont();

const Note: React.FC = () => {
  const [text, setText] = useState("");
  const [autoSaveNotes] = useDebounce(text, 5000);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [font, setFont] = useState<Font>(defaultFont);

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
        const newFont: Font = fontSwitcher(font);
        setFont(newFont);
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
    <div className={cx(`note-container`, theme.className, font.className)}>
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
