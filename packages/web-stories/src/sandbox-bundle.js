import IFrameBridge from './sandbox/iframe-bridge';

document.domain = 'localhost';
class MyBridge extends IFrameBridge {
  constructor(...args) {
    super(...args);
  }
  init({ events }) {
    console.log('Bridge init');
    const elementsToBeListen = document.querySelectorAll('web-stories-main-component');

    elementsToBeListen.forEach((elem) => {}, {});
  }
}

window.PUBLIC = {
  ...window.PUBLIC,
  IFrameBridge: MyBridge,
};
