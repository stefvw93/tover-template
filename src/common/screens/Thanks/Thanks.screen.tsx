import React from 'react';
import { IThanksProps, IThanksState } from '.';
import { classNames } from './thanks.style';

export class Thanks extends React.Component<IThanksProps, IThanksState> {
  public render(): React.ReactNode {
    return (
      <div className={classNames.container}>
        <h1>Hello, world!</h1>
        <p>
          {'You are using '}
          <a
            target="_blank"
            href="https://github.com/stefvw93/typescript-react-boilerplate"
          >
            {'typescript-react-boilerplate'}
          </a>
          {'.'}
        </p>
        <p>
          {'Made with ❤️ by '}
          <a target="_blank" href="https://github.com/stefvw93">
            {'Stef van Wijchen'}
          </a>
        </p>
      </div>
    );
  }
}
