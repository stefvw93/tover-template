import { styleController } from './styleController';

function createRow(
  spacingFactor: number = 1,
  usePadding: boolean = false
): string {
  const verticalSpacing =
    styleController.guide.spacing.vertical * spacingFactor;
  return styleController.create({
    [usePadding ? 'paddingTop' : 'marginTop']: `${verticalSpacing}px`,
    [usePadding ? 'paddingBottom' : 'marginBottom']: `${verticalSpacing}px`,
  });
}
function createColumn(spacingFactor: number = 1): string {
  const horizontalSpacing =
    styleController.guide.spacing.horizontal * spacingFactor;
  return styleController.create({
    paddingLeft: `${horizontalSpacing}px`,
    paddingRight: `${horizontalSpacing}px`,
  });
}

export const mixins = {
  row: createRow,
  column: createColumn,
};
