import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { filter } from 'rsvp';
import DS from 'ember-data';

export default Component.extend({
  store: service(),

  filteredOptions: computed('valorization.version', 'category', function () {
    return DS.PromiseObject.create({
      promise: this._getCategoryOptions(),
    });
  }),

  _getCategoryOptions() {
    const valorization = this.get('valorization');
    const categoryId = this.get('category.id');
    const vehicleDate = valorization.get('releasedAt');
    return valorization.get('version')
      .then(version => this._getVehiclePeriod(version, vehicleDate))
      .then(period => period.query('optionalFeatures', {
        page: { size: 500 },
        include: 'feature-category',
      }))
      .then(optionalFeatures => this._filterOptionsByCategory(optionalFeatures, categoryId));
  },

  _getVehiclePeriod(version, vehicleDate) {
    return version.get('periods')
      .then(periods => periods.find((currentPeriod) => {
        const periodStartDate = moment(currentPeriod.get('startDate'));
        const periodEndDate = moment(currentPeriod.get('endDate'));
        if(!currentPeriod.get('endDate')) {
          return moment(vehicleDate).isAfter(periodStartDate)
        }
        return moment(vehicleDate).isAfter(periodStartDate) && moment(vehicleDate).isBefore(periodEndDate); // eslint-disable-line
      }));
  },

  _filterOptionsByCategory(periodOptions, categoryId) {
    return filter(periodOptions.toArray(), (option) => {
      const filterPromise = option.get('featureCategory').then((featureCategory) => {
        const featureCategoryId = featureCategory.get('id');
        return featureCategoryId === categoryId;
      });
      return filterPromise;
    });
  },
});
