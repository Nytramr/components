(function () {
  'use strict';

  function n(n) {
    let t = !0;
    return window.requestAnimationFrame(function i() {
      if (t && n) {
        var o = n.contentDocument || n.contentWindow.document;

        if (o) {
          var f = o.scrollingElement.scrollHeight || 800;
          n.height = f;
        }

        window.requestAnimationFrame(i);
      }
    }), function () {
      t = !1;
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
      this.stopResizing = n(this.iFrame);
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

  window.customElements.define('nr-iframe-container', IFrameContainer);

  var css = ":host {\n  display: block;\n}\n\n.tab-button {\n  text-decoration: none;\n  color: black;\n  background-color: #cccccc;\n  padding: 4px 8px;\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  border-right: 1px solid black;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  display: block;\n}\n\n.tab-button.active {\n  background-color: white;\n}\n\n#tabs-header {\n  display: flex;\n}\n\n#tabs-body {\n  position: relative;\n  border: 1px solid black;\n  flex-grow: 1;\n}\n\n::slotted(*) {\n  position: relative;\n  display: none;\n  width: 100%;\n}\n\n::slotted(.active) {\n  display: block;\n}\n\n/* #tabs-body .active {\n  display: block;\n} */\n\n#tabs {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n";

  class Tabs extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.innerHTML = `
    <style>
      ${css}
    </style>
    <div id="tabs">
      <div id="tabs-header"></div>
      <div id="tabs-body">
        <slot></slot>
      </div>
    </div>`;
      this.tabHeader = shadowRoot.querySelector('#tabs-header');
      this._slot = shadowRoot.querySelector('slot');
      this.slotChangeHandler = this._slotChangeHandler.bind(this);
      this.changeTabHandler = this._changeTabHandler.bind(this);
    }

    _slotChangeHandler() {
      const tabElements = this._slot.assignedElements();

      const tabButtons = tabElements.map(this._createTabButton).join('');
      this.tabHeader.innerHTML = tabButtons;
    }

    _changeTabHandler(event) {
      event.stopPropagation();
      const tabId = event.target.dataset.tabid;

      if (tabId) {
        this.setActiveTab(tabId);
      }
    }

    _createTabButton(tabElement) {
      const tabId = tabElement.id;
      const tabLabel = tabElement.dataset.tablabel;
      const isActive = tabElement.classList.contains('active');
      return `<a href="#" part="tab-button ${isActive ? 'active' : ''}" class="tab-button ${isActive ? 'active' : ''}" data-tabId="${tabId}">${tabLabel || tabId}</a>`;
    }

    setActiveTab(tabId) {
      const tabButton = this.shadowRoot.querySelector(`[data-tabid=${tabId}]`);
      const tab = this.querySelector(`#${tabId}`);
      const activeButton = this.shadowRoot.querySelector('.tab-button.active');
      const activeTab = this.querySelector('.active');
      activeButton && activeButton.classList.remove('active');
      activeButton && activeButton.part.remove('active');
      activeTab && activeTab.classList.remove('active');
      tabButton && tabButton.classList.add('active');
      tabButton && tabButton.part.add('active');
      tab && tab.classList.add('active');
    }

    connectedCallback() {
      this._slot.addEventListener('slotchange', this.slotChangeHandler);

      this.tabHeader.addEventListener('click', this.changeTabHandler);
    }

    disconnectedCallback() {
      this._slot.removeEventListener('slotchange', this.slotChangeHandler);

      this.tabHeader.removeEventListener('click', this.changeTabHandler);
    }

  }

  function define(tagName) {
    customElements.define(tagName, Tabs);
  }

  define('web-tabs');

}());
