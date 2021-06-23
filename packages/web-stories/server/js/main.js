(function () {
  'use strict';

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

  define('nr-tabs');

}());
