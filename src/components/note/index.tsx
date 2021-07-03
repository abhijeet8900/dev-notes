import ReactQuill from "react-quill";
import "./note.scss";

interface Props {
  value?: string;
  onChange?: (value: string) => {};
}

function Note(props: Props) {
  const onChange = (value: string) => {
    props.onChange && props.onChange(value);
  };
  return (
    <ReactQuill
      className="note"
      placeholder="Type your text...."
      theme="bubble"
      value={props.value ?? ""}
      onChange={onChange}
    />
  );
}

export default Note;
