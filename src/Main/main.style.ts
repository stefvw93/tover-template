import { styleController, styleMixins } from 'style';

export const classNames = {
  container: styleController.create(styleMixins.column(), {
    $debugName: 'main',
    overflow: 'auto',
  }),
};
