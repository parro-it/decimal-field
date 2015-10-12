const test = require('tape-async');
const decimalField = require('..');

test('add details files', function *(t) {
  const result = yield decimalField();
  t.equal(result, 42);
});
