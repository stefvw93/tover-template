import { styleController, styleMixins } from 'style';

export const classNames = {
  container: styleController.create(styleMixins.row()),
  logo: styleController.create(
    {
      width: 100,
      height: 100,
      objectFit: 'contain',
    },
    styleMixins.column()
  ),
};
