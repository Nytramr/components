/**
 * we need to use symbols until JS implements private properties
 */

const subscribers = Symbol('subscribers');

export class Emitter {
  constructor() {
    this[subscribers] = [];
    this['emit'] = this.emit.bind(this);
    this['addSubscriber'] = this.addSubscriber.bind(this);
    this['removeSubscriber'] = this.removeSubscriber.bind(this);
  }

  emit(payload) {
    this[subscribers].forEach((subscriber) => subscriber(payload));
  }

  addSubscriber(subscriber) {
    if (!this[subscribers].includes(subscriber)) {
      this[subscribers].push(subscriber);
    }
  }

  removeSubscriber(subscriber) {
    const index = this[subscribers].indexOf(subscriber);
    if (index >= 0) {
      this[subscribers].splice(index, 1);
    }
  }
}
