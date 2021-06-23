/**
 * Custom element to create and manage synchronous communication with an Iframe, without using post messages
 *
 * The page loaded on the Iframe must have a global bridge class on its global scope.
 *
 * This custom element will throw custom events into the parent DOM on behalf of the Bridge instance inside the Iframe.
 *
 */

// import { retry } from '../../utils/ready';
import { resizeIframe } from '@nytramr/utils/lib/resize-Iframe';

document.domain = 'localhost';

class IFrameContainer extends HTMLElement {
  static get observedAttributes() {
    return ['src'];
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
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
    if (name !== 'src' && oldValue === newValue) {
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
      this.iFrame.removeEventListener(this._loadIframeHandler);
      this.stopResizing && this.stopResizing();
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

export default function define(tagName) {
  customElements.define(tagName, IFrameContainer);
}
