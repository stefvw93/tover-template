import { disableBodyScroll } from "body-scroll-lock";
import React from "react";
import { IScrollViewProps, IScrollViewState } from ".";
import style from "./scrollView.style";

/**
 * Scroll view UI component
 */
export class ScrollView extends React.Component<
  IScrollViewProps,
  IScrollViewState
> {
  public static defaultProps: IScrollViewProps = {
    snapToPosition: false
  };

  private containerRef = React.createRef<HTMLDivElement>();

  public render(): React.ReactNode {
    const children = this.props.children;
    const containerStyle = this.createContainerStyle();
    return (
      <div
        ref={this.containerRef}
        className={style.scrollContainer}
        style={containerStyle}
      >
        {children}
      </div>
    );
  }

  public componentDidMount(): void {
    const $element = this.containerRef.current;
    if ($element) disableBodyScroll(this.containerRef.current);
  }

  /**
   * Create inline style properties for the container element
   */
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
