import { Emitter } from '@nytramr/utils/lib/emitter';

const eventLog = Symbol('event-log');
const eventLogTemplate = Symbol('event-log-template');
export class EventManager extends Emitter {
  constructor() {
    super(); // always initialize super
    // get the div where I will add the events
    this[eventLog] = document.getElementById('event-log');
    this[eventLogTemplate] = document.getElementById('event-log-template');
  }
  printEvent(name, event) {
    const eventElement = this[eventLogTemplate].content.cloneNode(true);
    const eventName = eventElement.querySelector('.event-name');
    const eventData = eventElement.querySelector('.event-data');

    eventName.textContent = name;
    eventData.textContent = JSON.stringify(Object.assign({}, event));
    this[eventLog].prepend(eventElement);

    // Maybe there is no need to emit anything.
    this.emit({ eventName: name, event });
  }
}
