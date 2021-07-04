export interface Font {
  id: string;
  label: string;
  className: string;
}

export const FONTS: Font[] = [
  {
    id: "system",
    label: "System Font",
    className: "font-system",
  },
  {
    id: "Typewriter",
    label: "Typewriter Font",
    className: "font-typewriter",
  },
];
