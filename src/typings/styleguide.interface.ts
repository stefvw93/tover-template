export type ColorMap = { [key: string]: string | number };

export interface IStyleGuide {
  colors: ColorMap;
  spacing: {
    horizontal: number;
    vertical: number;
  };
}
