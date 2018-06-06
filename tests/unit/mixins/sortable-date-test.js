import EmberObject from '@ember/object';
import SortableDateMixin from 'jefe/mixins/sortable-date';
import { module, test } from 'qunit';

module('Unit | Mixin | sortableDate', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SortableDateObject = EmberObject.extend(SortableDateMixin);
    let subject = SortableDateObject.create();
    assert.ok(subject);
  });
});
