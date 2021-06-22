import IFrameBridge from '@nytramr/nr-iframe/lib/nr-iframe-bridge';

document.domain = 'localhost';

window.IFrameBridge = IFrameBridge;

class MyBridge extends IFrameBridge {
  init() {
    console.log('Bridge init');
  }
}

window.PUBLIC = {
  IFrameBridge: MyBridge,
};
