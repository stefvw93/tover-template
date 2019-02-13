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

  private containerRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const $element = this.containerRef.current;
    if ($element) disableBodyScroll(this.containerRef.current);
  }

  public render(): React.ReactNode {
    const _children = this.props.children;
    const _containerStyle = this.createContainerStyle();
    return (
      <div
        ref={this.containerRef}
        className={style.scrollContainer}
        style={_containerStyle}
      >
        {_children}
      </div>
    );
  }

  private createContainerStyle(): React.CSSProperties {
    const { width, height, snapToPosition } = this.props;
    const style: React.CSSProperties = {
      width,
      height,
      WebkitOverflowScrolling: snapToPosition ? "unset" : "touch"
    };

    return style;
  }
}
