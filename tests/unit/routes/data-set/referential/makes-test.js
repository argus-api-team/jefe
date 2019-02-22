import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | data-set/referential/makes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:data-set/referential/makes');
    assert.ok(route);
  });
});
