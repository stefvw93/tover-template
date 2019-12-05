import { Thanks } from 'common/screens/Thanks';
import React from 'react';
import { IMainProps, IMainState } from '.';
import { classNames } from './main.style';

export class Main extends React.Component<IMainProps, IMainState> {
  public render(): React.ReactNode {
    return (
      <div className={classNames.container}>
        <Thanks />
      </div>
    );
  }
}
