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

const content = () => `
<section class="active" id="id-0" data-tablabel="Tab 1">
  <h1>Fist Tab Content</h1>
  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
    id est laborum."</p>
</section>
<section id="id-1" data-tablabel="Tab 2"></section>
`;

Array.from(iFrames).forEach((iFrame) => {
  iFrame.addEventListener('load-content', (event) => {
    const Bridge = event.target.Bridge;
    console.log(Bridge.version);
    if (Bridge) {
      const instance = new Bridge('makeIdUnique', { eventManager });
      instance.init({
        tagName: 'nr-tabs',
        props: {},
        content,
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
