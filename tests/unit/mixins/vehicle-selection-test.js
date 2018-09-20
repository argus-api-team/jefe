import EmberObject from '@ember/object';
import VehicleSelectionMixin from 'jefe/mixins/vehicle-selection';
import { module, test } from 'qunit';

module('Unit | Mixin | vehicle-selection', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let VehicleSelectionObject = EmberObject.extend(VehicleSelectionMixin);
    let subject = VehicleSelectionObject.create();
    assert.ok(subject);
  });
});
