import Component from '@ember/component';
import { computed } from '@ember/object';
import { filter } from 'rsvp';
import DS from 'ember-data';

export default Component.extend({
  tagName: 'li',
  classNames: ['model-list__item'],

  filteredSubmodels: computed('makeModel.model.submodels.@each.endDate', 'productionFilter', function () {
    const submodels = this.get('makeModel.submodels');
    const productionFilter = this.get('productionFilter');

    return DS.PromiseArray.create({
      promise: filter(submodels.toArray(), (submodel) => {
        const isInProduction = !submodel.get('endDate');
        return !productionFilter || (productionFilter && isInProduction);
      }),
    });
  }),

});
