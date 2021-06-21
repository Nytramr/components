const tagName = 'mr-html-code';

class HtmlCode extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
}

customElements.define(tagName, HtmlCode);
