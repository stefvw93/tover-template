import React from 'react';
import { render } from 'react-dom';
import { styleController } from 'style';
import { Main } from './Main';

const $root = document.getElementById('root');
const $style = document.getElementById(
  styleController.tagId
) as HTMLStyleElement;

function createApp() {
  //   disableBodyScroll($root);
  render(<Main />, $root);
}

// check if styles were created before this piece of code has been reached (somehow, it has happened)
if ($style.innerHTML.length > 0) {
  createApp();
} else {
  /**
   * Create a MutationObserver that observes our main app style tag.
   * The app should not render before the styles are done rendering.
   *
   * The app does not like to be exposed while naked 🙈
   */
  new MutationObserver(function(
    mutations: MutationRecord[],
    observer: MutationObserver
  ): void {
    for (let mutation of mutations) {
      // if child list has changed -- style rules have been added to the style element
      if (mutation.type === 'childList') {
        // stop observing
        observer.disconnect();
        // create app
        createApp();
      }
    }
  }).observe($style, {
    attributes: true,
    childList: true,
    characterData: true,
  });
}
