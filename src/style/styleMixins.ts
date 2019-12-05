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
    const key = `${usePadding ? 'p' : 'm'}_${spacingFactor}`;

    if (f[key]) return f[key];

    const space = spacing.vertical * spacingFactor;

    f[key] = styleController.create({
      $debugName: `col_${spacingFactor}_${usePadding ? 'p' : 'm'}`,
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
    const key = `${useMargin ? 'm' : 'p'}_${spacingFactor}`;

    if (f[key]) return f[key];

    const space = spacing.horizontal * spacingFactor;

    f[key] = styleController.create({
      $debugName: `col_${spacingFactor}_${useMargin ? 'm' : 'p'}`,
      [useMargin ? 'marginLeft' : 'paddingLeft']: `${space}px`,
      [useMargin ? 'marginRight' : 'paddingRight']: `${space}px`,
    });

    return f[key];
  }
}

export const styleMixins = StyleMixins.instance;
