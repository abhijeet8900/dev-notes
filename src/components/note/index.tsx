import "./note.scss";

import cx from "classnames";
import ReactQuill from "react-quill";
import { useDebounce, useDebouncedCallback } from "use-debounce/lib";
import { useEffect, useRef, useState } from "react";

import Menus from "../menus";
import { DeltaStatic, Sources } from "quill";

import FontIcon from "../icons/font";
import ThemeIcon from "../icons/theme";
import ExportIcon from "../icons/export";
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
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [font, setFont] = useState<Font>(defaultFont);

  const debounced = useDebouncedCallback(
    (value) => {
      setText(value);
    },
    4000
  );

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
      icon: <ThemeIcon className="text-gray-400 hover:text-gray-800" />,
      label: "Theme",
      onClick: () => {
        const newTheme: Theme = themeSwitcher(theme);
        setTheme(newTheme);
      },
    },
    {
      label: "Font",
      icon: <FontIcon className=" text-gray-400 hover:text-gray-800" />,
      onClick: () => {
        const newFont: Font = fontSwitcher(font);
        setFont(newFont);
      },
    },
    {
      label: "Save",
      icon: <ExportIcon className=" text-gray-400 hover:text-gray-800" />,
      onClick: onSave,
    },
  ];

  /** Store notes in localstorage*/
  useEffect(() => {
    if (text !== initialNotes) setLocalNotes(text);
  }, [text]);

  const onChange = (
    content: string,
    delta: DeltaStatic,
    source: Sources,
    editor: any
  ) => {
    debounced(editor.getContents());
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
