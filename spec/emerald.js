import test    from 'blue-tape';
import Emerald from '../dist/emerald';

test("Emerald", t => {
  t.test('should exist', t => {
    t.equal(typeof Emerald, "function");
  });
});
