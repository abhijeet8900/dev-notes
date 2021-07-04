import { Font, FONTS } from "../constants/fonts";

export const fontSwitcher = (currentFont: Font): Font => {
  const currentFontIndex = FONTS.includes(currentFont)
    ? FONTS.indexOf(currentFont)
    : 0;
  const nextFontIndex = currentFontIndex + 1;
  return nextFontIndex < FONTS.length ? FONTS[nextFontIndex] : FONTS[0];
};

export const getDefaultFont = (): Font =>{
  return FONTS[0]
}