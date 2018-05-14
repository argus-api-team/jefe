import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DS from 'ember-data';
// import { filter } from 'rsvp';
// import { hash } from 'rsvp';

export default Component.extend({
  store: service(),
  i18n: service(),
  tagName: 'form',
  classNames: ['row'],
  didInsertElement() {
    const store = this.get('store');
    store.query('make', {
      page: { size: 500 },
      sort: 'name',
    }).then((allMakes) => {
      this.set('makeSelectOptions', allMakes);
    });
    // *****************************************************************************
    // Bug with power select, can't select a make without search term in group mode
    // *****************************************************************************
    // const makePromises = {
    //   allMakes: store.query('make', {
    //     page: { size: 500 },
    //     sort: 'name',
    //   }),
    //   topMakes: store.query('make', {
    //     sort: 'position-quote',
    //     page: { size: 10 },
    //   }),
    // };
    // hash(makePromises).then((hashResult) => {
    //   console.log(hashResult);
    //   const groupedMakes = [
    //     { groupName: 'Top makes', options: hashResult.topMakes },
    //     { groupName: 'All makes', options: hashResult.allMakes },
    //   ];
    //   console.log(groupedMakes);
    //   this.set('makeSelectOptions', groupedMakes);
    // });
  },

  modelsSelection: computed('selectedMake', 'vehicleDate', function () {
    // console.log('modelsSelection');
    const store = this.get('store');
    const selectedMake = this.get('selectedMake');
    const vehicleDate = this.get('vehicleDate');
    if (!selectedMake || !vehicleDate) {
      return false;
    }
    // console.log(vehicleDate);
    return DS.PromiseObject.create({
      promise: store.query('phase', {
        filter: {
          make: selectedMake.get('id'),
          startDate: { lt: vehicleDate.unix() },
          endDate: { gt: vehicleDate.unix() },
        },
      }).then((matchingPhases) => {
        // console.log(matchingPhases);
        return matchingPhases;
      }),
    });
  }),
  actions: {
    selectMake(make) {
      this.set('selectedMake', make);
      // this.calculateRoute();
      // this.updatePrice();
    },
  },

});
