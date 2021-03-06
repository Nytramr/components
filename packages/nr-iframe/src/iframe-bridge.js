/**
 * ~~Custom element~~ Class to create a bridge of synchronous communication between an iframe and its parent
 *
 * Conditions:
 * - CORS: Both parent and child must share same domain
 */

document.domain = 'localhost';

export default class IFrameBridge {
  static get version() {
    return '0.0.0';
  }

  constructor(id, dependencies) {
    this.id = id;
    this.readyDependency = dependencies.ready;
    this.closePlugin = dependencies.closePlugin;
    this.events = dependencies.event;
    this.errorDependency = dependencies.error;
  }

  /**
   * Must return a promise
   */
  init() {
    // Throw not implemented
  }

  /**
   * Must return a promise
   */
  update(config) {
    // Throw not implemented
  }

  /**
   * Must return a promise
   */
  terminate(reason) {}

  close() {
    this.closePlugin.close(this.id);
  }

  sendEvent(type, data) {
    this.events.event(this.id, type, data);
  }

  ready() {
    this.readyDependency.ready(this.id, this);
  }

  error() {
    this.errorDependency.error(this.id, 'MADE_UP_ERROR');
  }
}
