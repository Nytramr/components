import { define as defineIframe } from '@nytramr/nr-iframe';
import { define as defineTabs } from '@nytramr/nr-tabs';

defineTabs();
defineIframe();

// document.addEventListener('load-content', (event) => console.log('load', event, event.target));
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOMContentLoaded', event);

  const iFrames = document.querySelectorAll('web-iframe-container');

  Array.from(iFrames).forEach((iFrame) => {
    iFrame.addEventListener('load-content', (event) => {
      console.log('load content', event, event.target);
      const Bridge = event.target.Bridge;
      if (Bridge) {
        const instance = new Bridge();
        instance.init();
      } else {
        console.log('no bridge');
      }
    });

    // if (Bridge) {
    //   const instance = new Bridge();
    //   instance.init();
    // } else {
    //   console.log('no bridge');
    // }
  });
});
