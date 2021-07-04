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
import { DeltaStatic, Sources } from "quill";

const defaultTheme = getDefaultTheme();
const defaultFont = getDefaultFont();

const Note: React.FC = () => {
  const initialNotes = getLocalNotes();
  const [text, setText] = useState<string | DeltaStatic>(initialNotes);
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
    if (text !== initialNotes) setLocalNotes(text);
  }, [autoSaveNotes]);

  const onChange = (
    content: string,
    delta: DeltaStatic,
    source: Sources,
    editor: any
  ) => {
    setText(editor.getContents());
  };

  return (
    <div className={cx(`note-container`, theme.className, font.className)}>
      <ReactQuill
        className="note"
        placeholder="Type your text...."
        theme="bubble"
        defaultValue={text}
        onChange={onChange}
      />
      <Menus menus={menus} />
    </div>
  );
};

export default Note;
