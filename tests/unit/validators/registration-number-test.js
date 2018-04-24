import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:registration-number', 'Unit | Validator | registration-number', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  const validator = this.subject();
  assert.ok(validator);
});
