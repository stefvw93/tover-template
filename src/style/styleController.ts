import Color from 'color';
import { normalize, setupPage } from 'csstips';
import { createTypeStyle, cssRaw, cssRule, TypeStyle } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Font } from '.';

export class StyleController {
  /**
   * StyleController instance (singleton)
   */
  public static readonly instance = new StyleController();

  /**
   * Html ID attribute for the main style element that is used by the controller
   */
  public readonly tagId = 'main-app-style';

  /**
   * TypeStyle instance
   */
  private typeStyle: TypeStyle;

  /**
   * System font fallbacks
   */
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

  /**
   * Google fonts
   */
  private googleFonts: Font[] = [
    {
      family: 'Rubik',
      weights: [300, 400, 500, 700],
    },
  ];

  /**
   * Font stack
   */
  private fonts: Font[] = this.googleFonts;

  /**
   * Body text font stack
   */
  private bodyFontStack: string[] = [
    this.fonts[0].family,
    ...this.systemFontStack,
  ];

  /**
   * Header text font stack
   */
  private headerFontStack: string[] = [
    this.fonts[0].family,
    ...this.systemFontStack,
  ];

  /**
   * Color map
   */
  private colors = {
    outerSpace: Color('#131313'),
    wizardGrey: Color('#535c68'),
    pureApple: Color('#6ab04c'),
    carminePink: Color('#eb4d4b'),
  };

  /**
   * Border radii
   */
  private borderRadii = [15];

  /**
   * Base spacing amount
   */
  private spacing: number = 10;

  /**
   * Horizontal spacing - multiplies base spacing
   */
  private horizontalSpacingFactor: number = 1;

  /**
   * Vertical spacing - multiplies base spacing
   */
  private verticalSpacingFactor: number = 1.2;

  private constructor() {
    // always create @import's before any other css
    cssRaw(this.createGoogleFontImport());

    // https://typestyle.github.io/#/page
    setupPage('#root');
    normalize();

    // set base html styles
    // fontSize is set on the root element; use 'rem' as a unit for font sizes
    cssRule('html', {
      fontSize: '16px',
    });

    // set base body styles
    cssRule('body', {
      color: this.colors.outerSpace.toString(),
      fontFamily: this.systemFontStack,
      fontSize: '1rem',
    });

    this.init();
  }

  /**
   * Create a style element
   * assign an id
   * append the style element
   * instantiate TypeStyle and pass our style element
   */
  private init(): void {
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
   * Create a CSS class name from strings and CSS properties.
   *
   * @param from Strings and CSS property objects
   * @returns Combined CSS class names
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
   * Creates a CSS rule.
   *
   * @param selector CSS selector
   * @param objects CSS properties
   */
  public rule(selector: string, ...objects: NestedCSSProperties[]): void {
    return this.typeStyle.cssRule(selector, ...objects);
  }

  /**
   * Creates a google font css @import statement from the font stack.
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

  /**
   * Style guide.
   */
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
