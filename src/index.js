const isMovement = require('is-movement');
const fs = require('fs');
const insertCss = require('insert-css');


function allowMovementOnly(e) {
  if (isMovement(e)) {
    document.title = window.getSelection().getRangeAt(0).endOffset;
  } else {
    e.preventDefault();
  }
}

function decimalField() {
  const css = fs.readFileSync(__dirname + '/style.css');
  insertCss(css);

  const proto = Object.assign(
    Object.create(HTMLElement.prototype), {
      attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {

        case 'value':
          this.value = newVal;
          break;
        default:
          break;

        }
      },

      createdCallback() {
        this.editor = document.createElement('div');
        this.editor.setAttribute('contenteditable', 'true');
        this.editor.addEventListener('keydown', allowMovementOnly);
        this.editor.addEventListener('focus', e => {
          setTimeout(() => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(e.target);
            selection.removeAllRanges();
            selection.addRange(range);
          });
        });
        this.editor.classList.add('editor');
        this.appendChild(this.editor);
        this.value = this.getAttribute('value');
      }
    }
  );

  Object.defineProperty(proto, 'value', {
    get() { return this._value; },
    set(value) {
      this._value = value;
      this.editor.innerHTML = value;
    }
  });

  document.registerElement('field-decimal', {prototype: proto});

  return proto;
}

module.exports = decimalField();
