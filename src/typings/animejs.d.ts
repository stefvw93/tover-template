type FunctionBasedParameter = (
  element: HTMLElement,
  index: number,
  length: number
) => number;
type AnimeCallbackFunction = (anim: AnimeInstance) => void;
type AnimeTarget = string | object | HTMLElement | SVGElement | NodeList | null;
type DirectionOptions = "reverse" | "alternate" | "normal";
type EasingOptions =
  | "linear"
  | "easeInQuad"
  | "easeInCubic"
  | "easeInQuart"
  | "easeInQuint"
  | "easeInSine"
  | "easeInExpo"
  | "easeInCirc"
  | "easeInBack"
  | "easeInElastic"
  | "easeOutQuad"
  | "easeOutCubic"
  | "easeOutQuart"
  | "easeOutQuint"
  | "easeOutSine"
  | "easeOutExpo"
  | "easeOutCirc"
  | "easeOutBack"
  | "easeOutElastic"
  | "easeInOutQuad"
  | "easeInOutCubic"
  | "easeInOutQuart"
  | "easeInOutQuint"
  | "easeInOutSine"
  | "easeInOutExpo"
  | "easeInOutCirc"
  | "easeInOutBack"
  | "easeInOutElastic";

interface AnimeInstance {
  play(): void;
  pause(): void;
  restart(): void;
  reverse(): void;
  seek(time: number): void;

  began: boolean;
  paused: boolean;
  completed: boolean;
  finished: Promise<void>;

  begin: AnimeCallbackFunction;
  run: AnimeCallbackFunction;
  update: AnimeCallbackFunction;
  complete: AnimeCallbackFunction;

  autoplay: boolean;
  currentTime: number;
  delay: number;
  direction: string;
  duration: number;
  loop: number | boolean;
  offset: number;
  progress: number;
  remaining: number;
  reversed: boolean;

  animatables: ReadonlyArray<object>;
  animations: ReadonlyArray<object>;
}

type PropertyValue = number | string;
type FunctionBasedValues = (
  el: Element,
  index?: number,
  targetsLength?: number
) => PropertyValue;
type FromToValues = [PropertyValue, PropertyValue];
type PropertyValues = PropertyValue | FromToValues | FunctionBasedValues;
type PropertyParameters = {
  value: PropertyValues;
  duration?: FunctionBasedValues | number;
  delay?: FunctionBasedValues | number;
  elasticity?: FunctionBasedValues | number;
  easing?: EasingOptions | Function;
  round?: number | boolean | Function;
};
type Keyframes = PropertyParameters[];
type AnimatableProperty = PropertyValues | PropertyParameters | Keyframes;

interface AnimatableProperties {
  // Transformations
  translateX?: AnimatableProperty;
  translateY?: AnimatableProperty;
  rotate?: AnimatableProperty;
  scale?: AnimatableProperty;

  // CSS
  opacity?: AnimatableProperty;
  color?: AnimatableProperty;
  backgroundColor?: AnimatableProperty;
  left?: AnimatableProperty;
  top?: AnimatableProperty;
  border?: AnimatableProperty;

  // SVG
  strokeDashoffset?: AnimatableProperty;

  // DOM
  value?: AnimatableProperty;
  [prop: string]: AnimatableProperty;
}

interface AnimeAnimationParams extends AnimatableProperties {
  duration?: number | FunctionBasedParameter;
  delay?: number | FunctionBasedParameter;
  elasticity?: number | FunctionBasedParameter;
  round?: number | boolean | FunctionBasedParameter;
  easing?: EasingOptions | ReadonlyArray<number>;
  begin?: AnimeCallbackFunction;
  run?: AnimeCallbackFunction;
  update?: AnimeCallbackFunction;
  complete?: AnimeCallbackFunction;
  points?: any;
  direction?: DirectionOptions;
  [AnyAnimatedProperty: string]: any;
}

interface AnimeTimelineParams extends AnimeAnimationParams {
  offset?: number | string | FunctionBasedParameter;
}

interface AnimeTimelineInstance extends AnimeInstance {
  children: AnimeInstance[];
  add(
    params: AnimeAnimationParams & {
      targets?: AnimeTarget | ReadonlyArray<AnimeTarget>;
    },
    offset?: number | string
  ): AnimeTimelineInstance;
}

declare interface AnimeStatic {
  (
    options: AnimeAnimationParams & {
      targets: AnimeTarget | ReadonlyArray<AnimeTarget>;
    }
  ): void;
  version: string;
  speed: number;
  running: AnimeInstance[];
  remove(targets: AnimeTarget): void;
  get(target: Node, propName: string, unit?: string): string;
  set(targets: AnimeTarget, properties: any): void;
  convertPx(el: HTMLElement, value: string, unit: string): number;
  path(
    path: SVGPathElement | string,
    percent?: number
  ): (
    property: string
  ) => {
    property: string;
    el: SVGElement;
    svg: {
      el: SVGElement;
      viewBox: SVGViewElement;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    totalLength: number;
  };
  setDashoffset(el: HTMLElement | SVGElement | null): number;
  stagger(
    val: AnimatableProperty,
    params?: {
      direction: any;
      easing: EasingOptions;
      grid: number[];
      axis: "x" | "y";
    }
  ): (el: HTMLElement | SVGElement, i: number, t: number) => number;
  timeline(params?: AnimeTimelineParams): AnimeTimelineInstance;
  easing(easing: EasingOptions, duration: number): (x: number) => number;
  penner(): { [key in EasingOptions]: number[] };
  random(min: number, max: number): number;
}

declare module "animejs" {
  const static: AnimeStatic;
  export default static;
}
