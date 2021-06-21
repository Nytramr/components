(function () {
  'use strict';

  function resizeIframe(iframe) {
    let keepGoing = true;

    function resize() {
      if (keepGoing && iframe) {
        var dom = iframe.contentDocument || iframe.contentWindow.document;

        if (dom) {
          var height = dom.scrollingElement.scrollHeight || 800; // This default is because of the lightbox.

          iframe.height = height;
        }

        window.requestAnimationFrame(resize);
      }
    }

    window.requestAnimationFrame(resize);
    return function stop() {
      keepGoing = false;
    };
  }

  /**
   * Custom element to create and manage synchronous communication with an Iframe, without using post messages
   *
   * The page loaded on the Iframe must have a global bridge class on its global scope.
   *
   * This custom element will throw custom events into the parent DOM on behalf of the Bridge instance inside the Iframe.
   *
   */
  document.domain = 'localhost';

  class IFrameContainer extends HTMLElement {
    static get observedAttributes() {
      return ['src'];
    }

    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      root.innerHTML = `
      <style>
        :host {
          display: block;
        }
        iframe {
          width: 100%;
          box-sizing: border-box;
          border: none;
        }
      </style>
    `;
      this._loadIframeHandler = this._loadIframeHandler.bind(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }

      switch (name) {
        case 'src':
          this._loadIframe(newValue);

          break;
      }
    }

    _loadIframeHandler() {
      console.log('handle');
      this.stopResizing = resizeIframe(this.iFrame);
    }

    _unloadIframe() {
      if (this.iFrame) {
        var _this$stopResizing;

        this.iFrame.removeEventListener(this._loadIframeHandler);
        (_this$stopResizing = this.stopResizing) !== null && _this$stopResizing !== void 0 ? _this$stopResizing : this.stopResizing();
      }
    }

    _loadIframe(src) {
      /**
       * Stop current Iframe connection attempt (if any) or ignore it all together
       * remove current iFrame
       * show loading state? Maybe the children?
       * create a new iFrame with the given url
       * try to connect with the bridge
       *  If success -> Show Iframe
       *  On fail -> Show error (special slot?)
       */
      this._unloadIframe();

      const iFrame = document.createElement('iframe');
      iFrame.src = src;
      iFrame.addEventListener('load', this._loadIframeHandler);
      this.iFrame = iFrame;
      this.shadowRoot.appendChild(iFrame);
    }

    disconnectCallback() {
      this._unloadIframe();
    }

  }

  window.customElements.define('iframe-container', IFrameContainer);

}());
