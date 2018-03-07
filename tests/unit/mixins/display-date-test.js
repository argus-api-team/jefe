import EmberObject from '@ember/object';
import DisplayDateMixin from 'jefe/mixins/display-date';
import { module, test } from 'qunit';

module('Unit | Mixin | display date');

// Replace this with your real tests.
test('it works', function (assert) { // eslint-disable-line
  const DisplayDateObject = EmberObject.extend(DisplayDateMixin);
  const subject = DisplayDateObject.create();
  assert.ok(subject);
});
