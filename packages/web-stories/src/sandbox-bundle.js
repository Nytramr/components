import IFrameBridge from './sandbox/iframe-bridge';
import { render } from './sandbox/render-component';
import { subscribeEvents } from './sandbox/subscribe-events';

document.domain = 'localhost';
class MyBridge extends IFrameBridge {
  constructor(...args) {
    super(...args);
  }

  init({ events, tagName, props, content }) {
    render.bind(this)(tagName, props, content);
    subscribeEvents.bind(this)(events);
  }
}

window.PUBLIC = {
  ...window.PUBLIC,
  IFrameBridge: MyBridge,
};
