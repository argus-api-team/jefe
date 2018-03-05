import Object from '@ember/object';
import FeatureModelMixin from 'jefe/mixins/feature-model';
import { module, test } from 'qunit';

module('Unit | Mixin | feature model');

// Replace this with your real tests.
test('it works', function(assert) {
  let FeatureModelObject = Object.extend(FeatureModelMixin);
  let subject = FeatureModelObject.create();
  assert.ok(subject);
});
