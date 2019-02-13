import React from "react";
import { render } from "react-dom";
import { disableBodyScroll } from "body-scroll-lock";

// components
import { Main } from "./Main";

const $root = document.getElementById("root");
disableBodyScroll($root);

render(<Main />, $root);
