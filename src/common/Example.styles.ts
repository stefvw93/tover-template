import { style } from "typestyle";

export default class ExampleStyles {
  static readonly title = style({
    $debugName: "Example-title",
    fontFamily: "Helvetica"
  });

  static readonly poweredBy = style({
    $debugName: "PoweredBy",
    fontFamily: "Helvetica"
  });
}
