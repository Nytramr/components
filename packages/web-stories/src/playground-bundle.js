import { define as defineIframe } from '@nytramr/nr-iframe';
import { define as defineTabs } from '@nytramr/nr-tabs';
import { EventManager } from './playground/event-listener';

defineTabs();
defineIframe();

const eventManager = new EventManager();

eventManager.addSubscriber((payload) => {
  console.log('emitter', payload);
});

const iFrames = document.querySelectorAll('nr-iframe-container');

Array.from(iFrames).forEach((iFrame) => {
  iFrame.addEventListener('load-content', (event) => {
    const Bridge = event.target.Bridge;
    console.log(Bridge.version);
    if (Bridge) {
      const instance = new Bridge('makeIdUnique', { eventManager });
      instance.init({
        events: [
          { eventName: 'click' },
          { eventName: 'changetab', selector: 'nr-tabs' },
          { eventName: 'beforechangetab', selector: 'nr-tabs' },
        ],
      });
    } else {
      console.log('no bridge');
    }
  });
});
