export function resizeIframe(iframe) {
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

export default resizeIframe;
