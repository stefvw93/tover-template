import React from 'react';
import { IThanksProps, IThanksState } from '.';
import { classNames } from './thanks.style';
import { Intro } from 'components/templates/Intro';
import { List } from 'components/elements/List';

export class Thanks extends React.Component<IThanksProps, IThanksState> {
  public render(): React.ReactNode {
    return (
      <div className={classNames.container}>
        <Intro title={'Hello, world!'}>
          <p>
            {'You are using '}
            <a
              target="_blank"
              href="https://github.com/stefvw93/tover-template"
            >
              {'tover-template'}
            </a>
            {'.'}
          </p>
          <p>
            {'Made with ❤️ by '}
            <a target="_blank" href="https://github.com/stefvw93">
              {'Stef van Wijchen'}
            </a>
          </p>
          <img src={'assets/ts.png'} className={classNames.logo} />
          <img src={'assets/react.png'} className={classNames.logo} />
        </Intro>
      </div>
    );
  }
}
