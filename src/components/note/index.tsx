import "./note.scss";

import cx from "classnames";
import ReactQuill from "react-quill";
import { useDebounce } from "use-debounce/lib";
import { useEffect, useRef, useState } from "react";

import Menus from "../menus";
import { saveAs } from "file-saver";
import { DeltaStatic, Sources } from "quill";
import { Font } from "../../constants/fonts";
import { Theme } from "../../constants/themes";
import { pdfExporter, RawOrParsedDelta } from "quill-to-pdf";
import { setLocalNotes, getLocalNotes } from "../../utils/notes";
import { fontSwitcher, getDefaultFont } from "../../utils/fonts";
import { themeSwitcher, getDefaultTheme } from "../../utils/theme";

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
    if (typeof quillDelta != "undefined") {
      const pdfBlob = await pdfExporter.generatePdf(quillDelta);
      const fileName = `notes-${new Date().toString()}`;
      saveAs(pdfBlob, fileName);
    } else {
      console.error("Error Downloading notes");
    }
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
