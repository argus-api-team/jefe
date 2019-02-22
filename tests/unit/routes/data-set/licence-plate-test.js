import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | data-set/licence-plate', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:data-set/licence-plate');
    assert.ok(route);
  });
});
