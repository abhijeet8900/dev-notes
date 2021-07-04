export interface Theme {
  id: string;
  label: string;
  className: string;
}

export const THEMES: Theme[] = [
  {
    id: "white",
    label: "white Theme",
    className: "theme-white",
  },
  {
    id: "dark",
    label: "Dark Theme",
    className: "theme-dark",
  },
  {
    id: "paper",
    label: "Paper Theme",
    className: "theme-paper",
  },
];
