import React from 'react';
import { IIntroProps, IIntroState } from '.';
import { classNames } from './intro.style';

export class Intro extends React.Component<IIntroProps, IIntroState> {
  public render(): React.ReactNode {
    const { title, children } = this.props;

    return (
      <React.Fragment>
        <h1>{title}</h1>
        {children}
      </React.Fragment>
    );
  }
}
