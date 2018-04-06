import Controller from '@ember/controller';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default Controller.extend({

  selectedPeriod: computed('model', function () {
    const model = this.get('model');
    return DS.PromiseObject.create({
      promise: model.get('periods').then((periods) => {
        const periodsArray = periods.toArray();
        return periodsArray.objectAt(periodsArray.length - 1);
      }),
    });
  }),
});
