import { boundMethod } from 'utilities';
import { styleController, StyleController } from './styleController';

class StyleMixins {
  public static readonly instance = new StyleMixins(styleController);
  private constructor(private controller: StyleController) {}

  /**
   * Create/returns a css class name for row spacing
   *
   * @param spacingFactor multiplies the default spacing
   * @param usePadding use padding instead of margin
   */
  @boundMethod public row(
    spacingFactor: number = 1,
    usePadding: boolean = false
  ): string {
    const f = this.row;
    const { spacing } = this.controller.guide;
    const key = `${usePadding ? 'p' : 'm'}-${spacingFactor}`;

    if (f[key]) return f[key];

    const space = spacing.vertical * spacingFactor;

    f[key] = styleController.create({
      $debugName: `row-${key}`,
      [usePadding ? 'paddingTop' : 'marginTop']: `${space}px`,
      [usePadding ? 'paddingBottom' : 'marginBottom']: `${space}px`,
    });

    return f[key];
  }

  /**
   * Create/returns a css class name for column spacing
   *
   * @param spacingFactor multiplies the default spacing
   */
  @boundMethod public column(
    spacingFactor: number = 1,
    useMargin = false
  ): string {
    const f = this.column;
    const { spacing } = this.controller.guide;
    const key = `${useMargin ? 'm' : 'p'}-${spacingFactor}`;

    if (f[key]) return f[key];

    const space = spacing.horizontal * spacingFactor;

    f[key] = styleController.create({
      $debugName: `col-${key}`,
      [useMargin ? 'marginLeft' : 'paddingLeft']: `${space}px`,
      [useMargin ? 'marginRight' : 'paddingRight']: `${space}px`,
    });

    return f[key];
  }

  @boundMethod public boxShadow(
    xOffset = 0,
    yOffset = 10,
    blur = 40,
    spread = -15,
    color = 'rgba(0,0,0,0.6)'
  ): string {
    const f = this.boxShadow;
    const key = [xOffset, yOffset, blur, spread, color].join('_');

    if (f[key]) return f[key];

    const boxShadow = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}`;

    f[key] = styleController.create({
      $debugName: `shadow-${key}_`,
      boxShadow,
      MozBoxShadow: boxShadow,
      '-webkit-box-shadow': boxShadow,
    });

    return f[key];
  }
}

export const styleMixins = StyleMixins.instance;
