class DOMNodeCollection {
  constructor (elArr) {
    this.elArr = elArr;
  }

  html (string) {
    if (string) {
      this.elArr.forEach((el) => {
        el.innerHTML = string;
      });
      // return this.elArr;
    } else {
      return this.elArr[0].innerHTML;
    }
  }

  empty() {
    this.elArr.html = "";
  }

  forEach (callback){
    for (let i = 0; i < this.elArr.length; i++) {
      callback(this.elArr[i]);
    }
  }

  append(args) {
    this.elArr.forEach(el => {
      args.forEach(arg => {
        el.innerHTML += arg.outerHTML;
      });
    });
    return this.elArr;
  }

  attr(name, value) {
    let element = this.elArr.find((el) => {
      el.getAttribute(name);
    });
    if (value) {
      return element.setAttribute(name, value);
    } else {
      return element.getAttribute(name);
    }
  }

  myClassName() {
    const classArr = [];
    this.elArr.forEach(el => {
      classArr.push(el.className);
    });
    return classArr;
  }

  addClass (name) {
    this.elArr.forEach(el => {
      let className = el.className;
      className += ` ${name}`;
      el.className = className;
    });
    return this.elArr;
  }

  removeClass (name) {
    if (name) {
      this.elArr.forEach(el => {
        let className = el.className.replace(` ${name}`, "");
        el.className = className;
      });
    } else {
      this.elArr.forEach(el => {
        el.className = "";
      });
    }
    return this.elArr;
  }

  children() {
    let childrenArr = [];
    this.elArr.forEach(el => {
      childrenArr = childrenArr.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childrenArr);
  }
  parent() {
    let parentArr = [];
    this.elArr.forEach(el => {
      parentArr.push(el.parentNode);
    });
    return new DOMNodeCollection(parentArr);
  }

  find(selector) {
    const foundEl = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(foundEl));
  }

  remove (selector) {
    if (selector) {
      let foundEl = this.find(selector);
      foundEl.empty();
      foundEl.elArr = [];
    } else {
      this.empty();
      this.elArr = [];
    }
    return this.elArr;
  }
}

module.exports = DOMNodeCollection;
