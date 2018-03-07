import Object from '@ember/object';
import FeatureModelMixin from 'jefe/mixins/feature-model';
import { module, test } from 'qunit';

module('Unit | Mixin | feature model');

// Replace this with your real tests.
test('it works', function (assert) { // eslint-disable-line
  const FeatureModelObject = Object.extend(FeatureModelMixin);
  const subject = FeatureModelObject.create();
  assert.ok(subject);
});
