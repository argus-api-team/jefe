import Controller from '@ember/controller';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default Controller.extend({
  selectedPeriod: computed('model.vehicle', function () {
    const vehicle = this.get('model.vehicle');
    return DS.PromiseObject.create({
      promise: vehicle.get('periods').then((periods) => {
        const periodsArray = periods.toArray();
        return periodsArray.objectAt(periodsArray.length - 1);
      }),
    });
  }),
});
