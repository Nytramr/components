(() => {
  var t = {
      99: (t, e, n) => {
        var a = n(645)(function (t) {
          return t[1];
        });
        a.push([
          t.id,
          ':host {\n  display: block;\n}\n\n.tab-button {\n  text-decoration: none;\n  color: black;\n  background-color: #cccccc;\n  padding: 4px 8px;\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  border-right: 1px solid black;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  display: block;\n}\n\n.tab-button.active {\n  background-color: white;\n}\n\n#tabs-header {\n  display: flex;\n}\n\n#tabs-body {\n  position: relative;\n  border: 1px solid black;\n  flex-grow: 1;\n}\n\n::slotted(*) {\n  position: relative;\n  display: none;\n  width: 100%;\n}\n\n::slotted(.active) {\n  display: block;\n}\n\n.tab.active {\n  display: block;\n}\n\n#tabs {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}',
          '',
        ]),
          (t.exports = a);
      },
      645: (t) => {
        'use strict';
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var n = t(e);
                return e[2] ? '@media '.concat(e[2], ' {').concat(n, '}') : n;
              }).join('');
            }),
            (e.i = function (t, n, a) {
              'string' == typeof t && (t = [[null, t, '']]);
              var s = {};
              if (a)
                for (var o = 0; o < this.length; o++) {
                  var r = this[o][0];
                  null != r && (s[r] = !0);
                }
              for (var i = 0; i < t.length; i++) {
                var c = [].concat(t[i]);
                (a && s[c[0]]) || (n && (c[2] ? (c[2] = ''.concat(n, ' and ').concat(c[2])) : (c[2] = n)), e.push(c));
              }
            }),
            e
          );
        };
      },
      795: (t, e, n) => {
        const a = n(99);
        class s extends HTMLElement {
          constructor() {
            super();
            const t = this.attachShadow({ mode: 'open' });
            (t.innerHTML = `\n    <style>\n      ${a}\n    </style>\n    <div id="tabs">\n      <div id="tabs-header" part="tab-header"></div>\n      <div id="tabs-body" part="tab-body">\n        <slot></slot>\n      </div>\n    </div>`),
              (this.tabHeader = t.querySelector('#tabs-header')),
              (this._slot = t.querySelector('slot')),
              (this.slotChangeHandler = this._slotChangeHandler.bind(this)),
              (this.changeTabHandler = this._changeTabHandler.bind(this));
          }
          _slotChangeHandler() {
            const t = this._slot.assignedElements().map(this._createTabButton).join('');
            this.tabHeader.innerHTML = t;
          }
          _changeTabHandler(t) {
            t.stopPropagation();
            const e = t.target.dataset.tabid;
            e && this.setActiveTab(e);
          }
          _createTabButton(t) {
            const e = t.id,
              n = t.dataset.tablabel,
              a = t.classList.contains('active');
            return `<a href="#" part="tab-button ${a ? 'active' : ''}" class="tab-button ${
              a ? 'active' : ''
            }" data-tabId="${e}">${n || e}</a>`;
          }
          setActiveTab(t) {
            const e = this.shadowRoot.querySelector(`[data-tabid=${t}]`),
              n = this.querySelector(`#${t}`),
              a = this.shadowRoot.querySelector('.tab-button.active'),
              s = this.querySelector('.active');
            a && a.classList.remove('active'),
              a && a.part.remove('active'),
              s && s.classList.remove('active'),
              e && e.classList.add('active'),
              e && e.part.add('active'),
              n && n.classList.add('active');
          }
          connectedCallback() {
            this._slot.addEventListener('slotchange', this.slotChangeHandler),
              this.tabHeader.addEventListener('click', this.changeTabHandler);
          }
          disconnectedCallback() {
            this._slot.removeEventListener('slotchange', this.slotChangeHandler),
              this.tabHeader.removeEventListener('click', this.changeTabHandler);
          }
        }
        customElements.define('rk-tabs', s);
      },
    },
    e = {};
  function n(a) {
    if (e[a]) return e[a].exports;
    var s = (e[a] = { id: a, exports: {} });
    return t[a](s, s.exports, n), s.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var a in e) n.o(e, a) && !n.o(t, a) && Object.defineProperty(t, a, { enumerable: !0, get: e[a] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      'use strict';
      n(795);
    })();
})();
