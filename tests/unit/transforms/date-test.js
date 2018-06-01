import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:date', 'Unit | Transform | date', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:date');
    assert.ok(transform);
  });
});
