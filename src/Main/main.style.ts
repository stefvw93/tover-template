import { styleController } from "style";

const { spacing } = styleController.guide;

export const classNames = {
  container: styleController.create({
    padding: `${spacing.vertical}px ${spacing.horizontal}px`
  })
};
