import React from "react";
import { disableBodyScroll } from "body-scroll-lock";
// styles
import style from "./scrollView.style";
export class ScrollView extends React.Component {
    constructor() {
        super(...arguments);
        this.containerRef = React.createRef();
    }
    componentDidMount() {
        const $element = this.containerRef.current;
        if ($element)
            disableBodyScroll(this.containerRef.current);
    }
    render() {
        const _children = this.props.children;
        const _containerStyle = this.createContainerStyle();
        return (React.createElement("div", { ref: this.containerRef, className: style.scrollContainer, style: _containerStyle }, _children));
    }
    createContainerStyle() {
        const { width, height, snapToPosition } = this.props;
        const style = {
            width,
            height,
            WebkitOverflowScrolling: snapToPosition ? "unset" : "touch"
        };
        return style;
    }
}
ScrollView.defaultProps = {
    snapToPosition: false
};
