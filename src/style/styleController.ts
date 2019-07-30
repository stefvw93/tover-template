import Color from "color";
import { normalize, setupPage } from "csstips";
import { createTypeStyle, cssRaw, cssRule, style, TypeStyle } from "typestyle";
import { FontWeights, Shading } from ".";

export class StyleController {
  public static tagId = "main-app-style";
  private instance: TypeStyle;
  public create: typeof style;
  public rule: typeof cssRule;
  private elementResetStack: string = [
    "button",
    "input",
    "optgroup",
    "select",
    "textarea",
    `html input[type="button"]`,
    `input[type="reset"]`,
    `input[type="submit"]`,
    `button[disabled]`,
    `html input[disabled]`,
    `button::-moz-focus-inner`,
    `input::-moz-focus-inner`,
    `input[type="checkbox"]`,
    `input[type="radio"]`,
    `input[type="number"]::-webkit-inner-spin-button`,
    `input[type="number"]::-webkit-outer-spin-button`,
    `input[type="search"]`,
    `input[type="search"]::-webkit-search-cancel-button`,
    `input[type="search"]::-webkit-search-decoration`
  ].join(",");
  private systemFontStack: string = [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen-Sans",
    "Ubuntu,Cantarell",
    "Helvetica Neue",
    "sans-serif"
  ].join(",");

  private bodyFontStack = this.systemFontStack;
  private headerFontStack: string = ["Montserrat", this.bodyFontStack].join(
    ","
  );
  private headerFontWeights: FontWeights = [400, 600, 800];
  private bodyFontWeights: FontWeights = [400, 600, 800];

  public static colors = {
    // https://flatuicolors.com/palette/au
    text: Color("#131313"),
    wizardGrey: Color("#535c68"),
    pureApple: Color("#6ab04c"),
    carminePink: Color("#eb4d4b")
  };
  public colorShadesLight: Shading = [0.2, 0.5, 1];
  public colorShadesDark: Shading = [0.1, 0.3, 0.5];

  private colors = StyleController.colors;
  private borderRadii: number[] = [4, 6, 8];
  private spacing: number = 8;
  private horizontalSpacingFactor: number = 1;
  private verticalSpacingFactor: number = 1.5;

  constructor() {
    setupPage("#root");
    normalize();
    cssRule(this.elementResetStack, {
      background: "none",
      backgroundColor: "transparent",
      backgroundImage: "none",
      border: "none",
      boxShadow: "none",
      color: "inherit",
      font: "inherit",
      outline: "inherit",
      padding: 0
    });
    cssRule("html", {
      fontSize: "16px",
      background: this.colors.wizardGrey.lighten(1.65).toString()
    });
    cssRule("body", {
      color: this.colors.text.toString(),
      fontFamily: this.systemFontStack,
      fontSize: "1rem"
    });
    cssRaw(`
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `);
    cssRule("*", {
      "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
    });

    const $style = document.createElement("style");
    $style.id = StyleController.tagId;
    document.head.appendChild($style);
    this.instance = createTypeStyle($style);
    this.create = this.instance.style;
    this.rule = this.instance.cssRule;

    this.create({
      display: "block"
    });
  }

  public createBoxShadow(
    xOffset = 0,
    yOffset = 0,
    blur = 5,
    opacity = 0.3
  ): string {
    return `${xOffset}px ${yOffset}px ${blur}px rgba(0,0,0,${opacity})`;
  }

  public guide = {
    colors: this.colors,
    borderRadii: this.borderRadii,
    fonts: {
      header: this.headerFontStack,
      body: this.bodyFontStack
    },
    fontWeights: {
      header: this.headerFontWeights,
      body: this.bodyFontWeights
    },
    spacing: {
      base: this.spacing,
      horizontal: this.spacing * this.horizontalSpacingFactor,
      vertical: this.spacing * this.verticalSpacingFactor
    },
    animationDurations: {
      feedback: 100,
      effect: 200
    }
  };
}

export const styleController = new StyleController();
