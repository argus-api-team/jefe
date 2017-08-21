import Ember from 'ember';
import FeatureModelMixin from 'jefe/mixins/feature-model';
import { module, test } from 'qunit';

module('Unit | Mixin | feature model');

// Replace this with your real tests.
test('it works', function(assert) {
  let FeatureModelObject = Ember.Object.extend(FeatureModelMixin);
  let subject = FeatureModelObject.create();
  assert.ok(subject);
});
