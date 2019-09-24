export type Font = {
  family: string;
  weights: number[];
};

export type CSSClassNameMap = {
  [className: string]: string;
};

export { mixins } from "./mixins";
export { styleController } from "./styleController";
