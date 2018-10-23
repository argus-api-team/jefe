import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['row', 'align-items-center'],
  isDesc: computed('sortOrder', function () {
    return this.get('sortOrder') === 'desc';
  }),
  activeProperty: computed('sortOption.isActive', function () {
    const sortOption = this.get('sortOption');
    return sortOption.isActive;
  }),
  actions: {
    changeSortProperties(option) {
      if (this.get('sortBy') === option) {
        this.send('changeSortOrder');
      } else {
        this.set('sortBy', option);
      }
    },
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
