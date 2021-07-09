export function render(tagName, props, content) {
  const sandbox = document.getElementById('--web-stories-sandbox-content--');

  if (tagName && props) {
    const component = document.createElement(tagName);

    Object.entries(props).forEach(([attr, value]) => {
      component.setAttribute(attr, value);
    });

    if (typeof content === 'function') {
      component.innerHTML = content();
    } else {
      component.innerHTML = content;
    }

    sandbox.replaceChildren(component);
  }
  if (!tagName) {
    // render that a component is required
  }
}
