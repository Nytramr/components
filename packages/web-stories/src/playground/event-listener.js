import { printEventActionDispatcher } from './store';

export class EventManager {
  printEvent(eventName, event) {
    dispatcher.dispatch(printEventActionDispatcher(eventName, event));
  }
}
