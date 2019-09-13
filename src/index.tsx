import { disableBodyScroll } from "body-scroll-lock";
import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader/root";
import { StyleController } from "style/styleController";
import { Main } from "./Main";

const App = hot(Main);
const $root = document.getElementById("root");
const $style = document.getElementById(StyleController.tagId);
let doRenderApp = false;

window.onload = function() {
  if (doRenderApp) {
    render(<App />, $root);
    doRenderApp = false;
  }
};

new MutationObserver(function(
  mutations: MutationRecord[],
  observer: MutationObserver
): void {
  for (let mutation of mutations) {
    // if child list has changed
    if (mutation.type === "childList") {
      // stop observing
      observer.disconnect();
      // render react app
      render(<App />, $root);
      doRenderApp = false;
    }
  }
}).observe($style, {
  attributes: true,
  childList: true,
  characterData: true
});

if (module["hot"]) {
  module["hot"].accept();
}

disableBodyScroll($root);
