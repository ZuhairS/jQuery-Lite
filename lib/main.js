const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg) {
  if (arg instanceof HTMLElement) {
    const elArr = [arg];
    return new DOMNodeCollection(elArr);
  } else {
    const nodeList = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(nodeList);
  }
};
