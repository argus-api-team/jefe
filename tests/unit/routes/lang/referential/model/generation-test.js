import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | lang/referential/model/generation', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:lang/referential/model/generation');
    assert.ok(route);
  });
});
