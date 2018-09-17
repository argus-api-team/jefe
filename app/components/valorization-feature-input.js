import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'label',
  classNames: ['m-checkbox', 'm--margin-bottom-10', 'feature-checkbox'],

  isSelected: computed('valorizationFeatures.length', function () {
    const valorizationFeatures = this.get('valorizationFeatures');
    const feature = this.get('feature');
    return valorizationFeatures.includes(feature);
  }),

  click(e) {
    e.preventDefault();
    const valorizationFeatures = this.get('valorizationFeatures');
    const feature = this.get('feature');
    const isSelected = this.get('isSelected');
    if (isSelected) {
      valorizationFeatures.removeObject(feature);
    } else {
      valorizationFeatures.pushObject(feature);
    }
  },
});
