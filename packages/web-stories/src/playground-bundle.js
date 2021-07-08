import { define as defineIframe } from '@nytramr/nr-iframe';
import { define as defineTabs } from '@nytramr/nr-tabs';
import { EventManager } from './playground/event-listener';
import { store, getEvents } from './playground/store';

defineTabs();
defineIframe();

const eventManager = new EventManager();

// document.addEventListener('load-content', (event) => console.log('load', event, event.target));
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOMContentLoaded', event);

  const iFrames = document.querySelectorAll('nr-iframe-container');

  Array.from(iFrames).forEach((iFrame) => {
    iFrame.addEventListener('load-content', (event) => {
      console.log('load content', event, event.target);
      const Bridge = event.target.Bridge;
      console.log(Bridge.version);
      if (Bridge) {
        const instance = new Bridge('makeIdUnique', { eventManager });
        instance.init({ events: [{ eventName: 'click' }] });
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

store.subscribe(console.log, getEvents);
