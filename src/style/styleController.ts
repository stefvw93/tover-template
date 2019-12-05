import Color from 'color';
import { normalize, setupPage } from 'csstips';
import { createTypeStyle, cssRaw, cssRule, TypeStyle } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Font } from '.';

export class StyleController {
  // make this a singleton
  public static readonly instance = new StyleController();

  // id for HTML style tag
  public readonly tagId = 'main-app-style';

  // typestyle instance
  private typeStyle: TypeStyle;

  // HTML elements to reset styling of
  private elementResetStack: string[] = [
    'button',
    'input',
    'optgroup',
    'select',
    'textarea',
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
    `input[type="search"]::-webkit-search-decoration`,
  ];

  // system font backup
  private systemFontStack = [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen-Sans',
    'Ubuntu,Cantarell',
    'Helvetica Neue',
    'sans-serif',
  ];

  // fonts
  private googleFonts: Font[] = [
    {
      family: 'Rubik',
      weights: [300, 400, 500, 700],
    },
  ];
  private fonts: Font[] = this.googleFonts;
  private bodyFontStack: string[] = [
    this.fonts[0].family,
    ...this.systemFontStack,
  ];
  private headerFontStack: string[] = [
    this.fonts[0].family,
    ...this.systemFontStack,
  ];

  // colors
  private colors = {
    text: Color('#131313'),
    wizardGrey: Color('#535c68'),
    pureApple: Color('#6ab04c'),
    carminePink: Color('#eb4d4b'),
  };
  private borderRadii = [15];
  private spacing: number = 10;
  private horizontalSpacingFactor: number = 1;
  private verticalSpacingFactor: number = 1.2;

  private constructor() {
    // always create @import's before any other css
    cssRaw(this.createGoogleFontImport());

    // https://typestyle.github.io/#/page
    setupPage('#root');
    normalize();

    // add reset style rule to the element stack
    cssRule(this.elementResetStack.join(','), {
      background: 'none',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      border: 'none',
      boxShadow: 'none',
      color: 'inherit',
      font: 'inherit',
      outline: 'inherit',
      padding: 0,
    });

    // set base html styles
    cssRule('html', {
      fontSize: '16px',
      background: this.colors.wizardGrey.lighten(1.65).toString(),
    });

    // set base body styles
    cssRule('body', {
      color: this.colors.text.toString(),
      fontFamily: this.systemFontStack,
      fontSize: '1rem',
    });

    // use raw css to add font smoothing because typestyle doesn't have typings for this :(
    cssRaw(`
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `);

    /**
     * Create a style element
     * assign an id
     * append the style element
     * instantiate TypeStyle and pass our style element
     */
    const $style = document.createElement('style');
    $style.id = this.tagId;
    document.head.appendChild($style);
    this.typeStyle = createTypeStyle($style);

    // Create a style to fill the style tag (used in DOM Mutation observer, check src/index.ts)
    this.rule(`.Guarantee-${this.tagId}`, {
      $debugName: `Guarantee-${this.tagId}`,
      all: 'unset',
    });
  }

  /**
   * Create a css class name from strings and css properties
   *
   * @param from strings and css properties
   * @returns css class name
   */
  public create(...from: (string | NestedCSSProperties)[]): string {
    const nestedCssProperties = from.filter(
      _ => typeof _ === 'object'
    ) as NestedCSSProperties[];
    const classNames = from.filter(_ => typeof _ === 'string') as string[];

    classNames.push(this.typeStyle.style(...nestedCssProperties));

    return classNames.join(' ');
  }

  /**
   * create a css rule
   *
   * @param selector css selector
   * @param objects nested css properties
   */
  public rule(selector: string, ...objects: NestedCSSProperties[]): void {
    return this.typeStyle.cssRule(selector, ...objects);
  }

  /**
   * Creates a google font css @import statement from the font stack
   */
  private createGoogleFontImport(): string {
    const fonts = this.googleFonts
      .map(function(font) {
        return [font.family, font.weights.join(',')].join(':');
      })
      .join('|');

    const importStatement = `
      @import url('https://fonts.googleapis.com/css?family=${fonts}&display=swap');
    `;

    return importStatement;
  }

  // expose a style guide
  public readonly guide = {
    colors: this.colors,
    borderRadii: this.borderRadii,
    fonts: this.fonts,
    spacing: {
      base: this.spacing,
      horizontal: this.spacing * this.horizontalSpacingFactor,
      vertical: this.spacing * this.verticalSpacingFactor,
    },
  };
}

export const styleController = StyleController.instance;
