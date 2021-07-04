import { Theme, THEMES } from "../constants/themes";

export const themeSwitcher = (currentTheme: Theme): Theme => {
  const currentThemeIndex = THEMES.includes(currentTheme)
    ? THEMES.indexOf(currentTheme)
    : 0;
  const nextThemeIndex = currentThemeIndex + 1;
  return nextThemeIndex < THEMES.length ? THEMES[nextThemeIndex] : THEMES[0];
};

export const getDefaultTheme = (): Theme =>{
  return THEMES[0]
}