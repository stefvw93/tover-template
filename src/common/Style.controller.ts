import { style as createStyle, cssRule } from "typestyle";
import { normalize, setupPage } from "csstips";

// types
import { ColorMap, IStyleGuide } from "@typings/styleguide.interface";

export const style = new class Style {
  constructor() {
    setupPage("#root");
    normalize();
  }

  private _colors: ColorMap = {};
  private _spacing: number = 8;
  private _horizontalSpacingFactor: number = 1;
  private _verticalSpacingFactor: number = 1.5;

  public sheet = createStyle;
  public rule = cssRule;

  public get guide(): IStyleGuide {
    return {
      colors: this._colors,
      spacing: {
        horizontal: this._spacing * this._horizontalSpacingFactor,
        vertical: this._spacing * this._verticalSpacingFactor
      }
    };
  }
}();
