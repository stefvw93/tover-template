import { style } from ".";

function createRow(spacingFactor: number = 1): string {
  const _verticalSpacing = style.guide.spacing.vertical * spacingFactor;
  return style.sheet({
    marginTop: `${_verticalSpacing}px`,
    marginBottom: `${_verticalSpacing}px`
  });
}
function createColumn(spacingFactor: number = 1): string {
  const _horizontalSpacing = style.guide.spacing.horizontal * spacingFactor;
  return style.sheet({
    paddingLeft: `${_horizontalSpacing}px`,
    paddingRight: `${_horizontalSpacing}px`
  });
}

export default {
  row: createRow,
  column: createColumn
};
