import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['row', 'align-items-center'],
  isDesc: computed('sortOrder', function () {
    return this.get('sortOrder') === 'desc';
  }),
  activeProperty: computed('sortOptions.@each.isActive', function () {
    const sortOptions = this.get('sortOptions');
    return sortOptions.isAny('isActive', true);
  }),
  actions: {
    changeSortProperties(property) {
      if (this.get('sortProperty') === property) {
        this._changeSortOrder();
      } else {
        this.set('sortProperty', property);
      }
    },

  },
  _changeSortOrder() {
    const sortOrder = this.get('sortOrder');
    if (sortOrder === 'asc') {
      this.set('sortOrder', 'desc');
    } else {
      this.set('sortOrder', 'asc');
    }
  },
});
