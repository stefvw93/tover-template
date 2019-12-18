import { boundMethod, cachedResult } from 'utilities';
import { styleController, StyleController } from './styleController';

class StyleMixins {
  public static readonly instance = new StyleMixins(styleController);
  private constructor(private controller: StyleController) {}

  /**
   * Creates a css class name for row spacing
   *
   * @param spacingFactor multiplies the default spacing
   * @param usePadding use padding instead of margin
   */
  @boundMethod
  @cachedResult
  public row(spacingFactor: number = 1, usePadding: boolean = false): string {
    const { spacing } = this.controller.guide;
    const key = `${usePadding ? 'p' : 'm'}-${spacingFactor}`;
    const space = spacing.vertical * spacingFactor;

    return styleController.create({
      $debugName: `row-${key}`,
      [usePadding ? 'paddingTop' : 'marginTop']: `${space}px`,
      [usePadding ? 'paddingBottom' : 'marginBottom']: `${space}px`,
    });
  }

  /**
   * Creates a css class name for column spacing
   *
   * @param spacingFactor multiplies the default spacing
   */
  @boundMethod
  @cachedResult
  public column(spacingFactor: number = 1, useMargin = false): string {
    const { spacing } = this.controller.guide;
    const key = `${useMargin ? 'm' : 'p'}-${spacingFactor}`;
    const space = spacing.horizontal * spacingFactor;

    return styleController.create({
      $debugName: `col-${key}`,
      [useMargin ? 'marginLeft' : 'paddingLeft']: `${space}px`,
      [useMargin ? 'marginRight' : 'paddingRight']: `${space}px`,
    });
  }

  /**
   * Creates a css class name for a box shadow
   */
  @boundMethod
  @cachedResult
  public boxShadow(
    xOffset = 0,
    yOffset = 10,
    blur = 40,
    spread = -15,
    color = 'rgba(0,0,0,0.6)'
  ): string {
    const boxShadow = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}`;

    return styleController.create({
      $debugName: `shadow`,
      boxShadow,
      MozBoxShadow: boxShadow,
      '-webkit-box-shadow': boxShadow,
    });
  }
}

export const styleMixins = StyleMixins.instance;
