import { printEventActionDispatcher } from './store';

export class EventManager {
  printEvent(eventName, event) {
    console.log('event manager', eventName, event);
    printEventActionDispatcher(eventName, event);
  }
}
