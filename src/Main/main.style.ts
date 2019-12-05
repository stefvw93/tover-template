import { styleController, styleMixins } from 'style';

export const classNames = {
  container: styleController.create(
    styleMixins.column(),
    styleMixins.boxShadow(),
    {
      $debugName: 'main',
      overflow: 'auto',
    }
  ),
};
