import IFrameBridge from './iframe-bridge';

export function subscribeEvents(events) {
  this.eventHandlers = this.eventHandlers || [];

  // unsubscribe first
  this.eventHandlers.forEach(({ element, eventHandler }) => element.removeEventListener(eventHandler));

  // Events with selector - add event to that selector query result
  events
    .filter((event) => event.selector)
    .forEach(({ eventName, selector }) => {
      const eventHandler = (e) => {
        this.sendEvent(IFrameBridge.events.PRINT_EVENT, {
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
        this.sendEvent(IFrameBridge.events.PRINT_EVENT, {
          eventName,
          event: e,
        });
      };
      document.addEventListener(eventName, eventHandler);
      this.eventHandlers.push({ document, eventHandler });
    });
}
