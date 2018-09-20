import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: ['vertical-list__item'],
  didReceiveAttrs() {
    const valorization = this.get('valorization');
    const returnedAt = valorization.get('returnedAt');
    const calculatedFor = valorization.get('calculatedFor');
    if (returnedAt || calculatedFor) {
      this.set('computedDate', returnedAt ? returnedAt : calculatedFor);
    }
    else {
      valorization.get('customMarketValues').then((customMarketValues) => {
        this.set('computedDate', customMarketValues.get('calculatedFor'))
      })
    }
  },
  computedDate: null,
});
