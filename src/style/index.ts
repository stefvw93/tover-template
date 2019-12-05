export type Font = {
  family: string;
  weights: number[];
};

export type CSSClassNameMap = {
  [className: string]: string;
};

export { styleController } from './styleController';
export { styleMixins } from './styleMixins';
