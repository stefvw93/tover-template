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

disableBodyScroll($root);

function renderApp() {
  render(<App />, $root, function() {});
}

// wait for styles to be generated before rendering react app
function handleStyleMutation(
  mutations: MutationRecord[],
  observer: MutationObserver
): void {
  console.log("mutation", { mutations, observer });
  for (let mutation of mutations) {
    // if child list has changed
    if (mutation.type === "childList") {
      // stop observing
      observer.disconnect();
      // render react app
      doRenderApp = true;
    }
  }
}

const DOMMutationsObserver = new MutationObserver(handleStyleMutation);

DOMMutationsObserver.observe($style, {
  attributes: true,
  childList: true,
  characterData: true
});

window.onload = function() {
  // wait for styles to be generated before rendering react app
  console.log("window onload");
  if (doRenderApp) renderApp();
};

if (module["hot"]) {
  module["hot"].accept();
}
