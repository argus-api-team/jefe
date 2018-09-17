import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | lang/quote/valorize/criteria', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:lang/quote/valorize/criteria');
    assert.ok(route);
  });
});
