import { Thanks } from 'common/screens/Thanks';
import React from 'react';
import { IMainProps, IMainState } from '.';

export class Main extends React.Component<IMainProps, IMainState> {
  public render(): React.ReactNode {
    return <Thanks />;
  }
}
