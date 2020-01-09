import React from 'react';
import { IIntroProps } from '.';

export const Intro: React.SFC<IIntroProps> = ({ title, children }) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>
      {children}
    </React.Fragment>
  );
};
