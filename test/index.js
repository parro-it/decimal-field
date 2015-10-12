const test = require('tape-async');
require('..');

if (global.collider) {
  global.createInput = () => {
    const inp = document.createElement('field-decimal');
    inp.value = '42.420';
    document.body.appendChild(inp);

    global.collider.open();
  };

  test.syncTest('quit test environment.', t => {
    t.ok(true, 'quit');
    setTimeout(() => global.collider.quit(), 100);
  });
}
