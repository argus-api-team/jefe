import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNames: ['col', 'sort-param-button'],
  classNameBindings: ['sortOption.isActive'],
  isDesc: computed('sortOrder', function () {
    return this.get('sortOrder') === 'desc';
  }),
  activeProperty: computed('sortOption.isActive', function () {
    const sortOption = this.get('sortOption');
    return sortOption.isActive;
  }),
  click() {
    const { option } = this.get('sortOption');
    if (this.get('sortBy') === option) {
      this.send('changeSortOrder');
    } else {
      this.set('sortBy', option);
    }
  },
  actions: {
    changeSortOrder() {
      const sortOrder = this.get('sortOrder');
      if (sortOrder === 'asc') {
        this.set('sortOrder', 'desc');
      } else {
        this.set('sortOrder', 'asc');
      }
    },
  },
});
