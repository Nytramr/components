import IFrameBridge from './sandbox/iframe-bridge';
import { render } from './sandbox/render-component';

document.domain = 'localhost';
class MyBridge extends IFrameBridge {
  constructor(...args) {
    super(...args);
    this.eventHandlers = [];
  }

  notifyEvent(data) {
    this.sendEvent(IFrameBridge.events.PRINT_EVENT, data);
  }

  subscribeEvents(events) {
    // unsubscribe first
    this.eventHandlers.forEach(({ element, eventHandler }) => element.removeEventListener(eventHandler));

    // Events with selector - add event to that selector query result
    events
      .filter((event) => event.selector)
      .forEach(({ eventName, selector }) => {
        const eventHandler = (e) => {
          this.notifyEvent({
            eventName,
            event: e,
          });
        };
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          element.addEventListener(eventName, eventHandler);
          this.eventHandlers.push({ element, eventHandler });
        });
      });

    // Events without selector - add events to the document
    events
      .filter((event) => !event.selector)
      .forEach(({ eventName }) => {
        const eventHandler = (e) => {
          this.notifyEvent({
            eventName,
            event: e,
          });
        };
        document.addEventListener(eventName, eventHandler);
        this.eventHandlers.push({ document, eventHandler });
      });
  }

  init({ events, tagName, props, content }) {
    render(tagName, props, content);

    this.subscribeEvents(events);
  }
}

window.PUBLIC = {
  ...window.PUBLIC,
  IFrameBridge: MyBridge,
};
