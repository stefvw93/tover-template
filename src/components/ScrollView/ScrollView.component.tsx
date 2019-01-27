import React from "react";
import { disableBodyScroll } from "body-scroll-lock";

// types
import { IScrollViewProps, IScrollViewState } from ".";

// styles
import style from "./scrollView.style";

export class ScrollView extends React.Component<
  IScrollViewProps,
  IScrollViewState
> {
  public static defaultProps: IScrollViewProps = {
    snapToPosition: false
  };

  private _containerRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const $element = this._containerRef.current;
    if ($element) disableBodyScroll(this._containerRef.current);
  }

  public render(): React.ReactNode {
    const { children } = this.props;
    return (
      <div
        ref={this._containerRef}
        className={style.scrollContainer}
        style={this._createContainerStyle()}
      >
        {children}
      </div>
    );
  }

  private _createContainerStyle(): React.CSSProperties {
    const { width, height, snapToPosition } = this.props;
    const style: React.CSSProperties = {};
    Object.assign(
      style,
      width ? { width } : null,
      height ? { height } : null,
      // remove momentum scrolling if snapToPosition is true
      snapToPosition ? null : { "-webkit-overflow-scrolling": "touch" }
    );
    return style;
  }
}
