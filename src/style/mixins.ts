import { styleController } from "./styleController";

function createRow(
  spacingFactor: number = 1,
  usePadding: boolean = false
): string {
  const _verticalSpacing =
    styleController.guide.spacing.vertical * spacingFactor;
  return styleController.create({
    [usePadding ? "paddingTop" : "marginTop"]: `${_verticalSpacing}px`,
    [usePadding ? "paddingBottom" : "marginBottom"]: `${_verticalSpacing}px`
  });
}
function createColumn(spacingFactor: number = 1): string {
  const _horizontalSpacing =
    styleController.guide.spacing.horizontal * spacingFactor;
  return styleController.create({
    paddingLeft: `${_horizontalSpacing}px`,
    paddingRight: `${_horizontalSpacing}px`
  });
}

export const mixins = {
  row: createRow,
  column: createColumn
};
