import "./note.scss";

import cx from "classnames";
import ReactQuill from "react-quill";
import { useDebounce } from "use-debounce/lib";
import { useEffect, useRef, useState } from "react";

import Menus from "../menus";
import { DeltaStatic, Sources } from "quill";
import { Font } from "../../constants/fonts";
import { Theme } from "../../constants/themes";
import { RawOrParsedDelta } from "quill-to-pdf";
import { fontSwitcher, getDefaultFont } from "../../utils/fonts";
import { themeSwitcher, getDefaultTheme } from "../../utils/theme";
import { setLocalNotes, getLocalNotes, exportNotes } from "../../utils/notes";

const defaultTheme = getDefaultTheme();
const defaultFont = getDefaultFont();

const Note: React.FC = () => {
  const initialNotes = getLocalNotes();
  const [text, setText] = useState<string | DeltaStatic>(initialNotes);
  const [autoSaveNotes] = useDebounce(text, 5000);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [font, setFont] = useState<Font>(defaultFont);

  let quillRef = useRef<ReactQuill>(null);

  /** Download Notes */
  const onSave = async () => {
    const quillDelta: RawOrParsedDelta = quillRef.current
      ?.getEditor()
      .getContents() as RawOrParsedDelta;
    exportNotes(quillDelta);
  };

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
        onSave();
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
        ref={quillRef}
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
