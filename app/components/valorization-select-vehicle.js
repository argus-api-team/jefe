import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import DS from 'ember-data';
import moment from 'moment';
import { map } from 'rsvp';
import VehicleSelectionlMixin from '../mixins/vehicle-selection';

export default Component.extend(VehicleSelectionlMixin, {
  store: service(),
  i18n: service(),

  tagName: 'form',
  classNames: ['row'],

  didInsertElement() {
    const store = this.get('store');
    store.query('category', {
      page: { size: 500 },
      sort: 'name',
    }).then((allCategories) => {
      this.set('categoriesSelection', allCategories);
    });
  },

  submit(e) {
    e.preventDefault();
    const selectedVersion = this.get('selectedVersion');
    this.selectVersion(selectedVersion);
  },

  makesSelection: computed('selectedCategory', function () {
    const selectedCategory = this.get('selectedCategory');

    if (!selectedCategory) {
      return false;
    }
    return DS.PromiseObject.create({
      promise: selectedCategory.query('makes', {
        page: { size: 500 },
        sort: 'name',
      }),
    });
  }),

  phasesSelection: computed('vehicleDate', function () {
    const vehicleDate = this.get('vehicleDate');
    if (!vehicleDate) {
      return false;
    }
    return DS.PromiseObject.create({
      promise: this._getPhaseRecords(),
    });
  }),

  versionsSelection: computed('selectedPhase', function () {
    const vehicleDate = moment(this.get('vehicleDate')).format('YYYY-MM-DD');
    const selectedPhase = this.get('selectedPhase');
    if (!selectedPhase) {
      return false;
    }
    return DS.PromiseObject.create({
      promise: selectedPhase.query('versions', {
        page: { size: 500 },
        filter: {
          purchasableAt: vehicleDate,
        },
      }),
    });
  }),


  // Get availble phases with make and date combinaison
  _getPhaseRecords() {
    const selectedCategory = this.get('selectedCategory');
    const selectedMake = this.get('selectedMake');
    const vehicleDate = moment(this.get('vehicleDate')).format('YYYY-MM-DD');
    return selectedMake.query('submodels', {
      include: 'generations.phases',
      page: { size: 500 },
      filter: {
        purchasableAt: vehicleDate,
        category: selectedCategory.get('id'),
      },
      sort: 'name',
    })
      .then(submodels => map(submodels.toArray(), (submodel => submodel.get('generations'))))
      .then((generationsPromises) => {
        const generations = this._flattenPromisesArray(generationsPromises);
        const filteredGenerations = this._filterRecordsByDate(vehicleDate, generations);
        return map(filteredGenerations, (generation => generation.get('phases')));
      })
      .then((phasesPromises) => {
        const phases = this._flattenPromisesArray(phasesPromises);
        return this._filterRecordsByDate(vehicleDate, phases);
      });
  },

  _flattenPromisesArray(promisesResultsArray) {
    const simplifiedArray = promisesResultsArray.map(promiseResult => promiseResult.toArray());
    return simplifiedArray.reduce((prev, curr) => prev.concat(curr));
  },

  _filterRecordsByDate(targetDate, recordArray) {
    return recordArray.filter((record) => {
      const startDate = record.get('startDate');
      const endDate = record.get('endDate');
      if (endDate) {
        return moment(targetDate).isAfter(startDate) && moment(targetDate).isBefore(endDate);
      }
      return moment(targetDate).isAfter(startDate);
    });
  },

  // Input Resets
  resetSelectedMake: observer('selectedCategory', function () { // eslint-disable-line
    this.set('selectedMake', null);
  }),

  resetVehicleDate: observer('selectedMake', function () { // eslint-disable-line
    this.set('vehicleDate', null);
  }),

  resetSelectePhase: observer('vehicleDate', function () { // eslint-disable-line
    this.set('selectedPhase', null);
  }),

  resetSelectedVersion: observer('selectedPhase', function () { // eslint-disable-line
    this.set('selectedVersion', null);
  }),

});
