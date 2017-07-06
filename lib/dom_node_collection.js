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
    this.elArr.forEach(el => {
      el.html = "";
    });
  }

  

}

module.exports = DOMNodeCollection;
