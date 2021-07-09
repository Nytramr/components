import css from './css.css';

export class Tabs extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
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

    return `<a href="#" part="tab-button ${isActive ? 'active' : ''}" class="tab-button ${
      isActive ? 'active' : ''
    }" data-tabId="${tabId}">${tabLabel || tabId}</a>`;
  }

  setActiveTab(tabId) {
    const tab = this.querySelector(`#${tabId}`);
    const activeTab = this.querySelector('.active');

    const beforeChangeEvent = new CustomEvent('beforechangetab', {
      detail: {
        activeTab,
        nextTab: tab,
      },
      cancelable: true,
      composed: true,
    });
    const proceed = this.dispatchEvent(beforeChangeEvent);

    if (proceed) {
      const tabButton = this.shadowRoot.querySelector(`[data-tabid=${tabId}]`);
      const activeButton = this.shadowRoot.querySelector('.tab-button.active');

      activeButton && activeButton.classList.remove('active');
      activeButton && activeButton.part.remove('active');
      activeTab && activeTab.classList.remove('active');

      tabButton && tabButton.classList.add('active');
      tabButton && tabButton.part.add('active');
      tab && tab.classList.add('active');

      // send change event
      const changeEvent = new CustomEvent('changetab', {
        detail: {
          activeTab: tab,
        },
        cancelable: true,
        composed: true,
      });
      this.dispatchEvent(changeEvent);
    }
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

export function define() {
  customElements.define('nr-tabs', Tabs);
}
