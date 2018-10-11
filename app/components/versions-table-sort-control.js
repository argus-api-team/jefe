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
    changeSortProperty() {
      const sortOptions = this.get('sortOptions');
      const sortOptionsStatus = sortOptions.mapBy('isActive');
      const indexOfActive = sortOptionsStatus.indexOf(true);
      const isLastOptions = indexOfActive === sortOptions.length - 1;
      if (indexOfActive === -1 || isLastOptions) {
        this.set('sortProperty', sortOptions[0].property);
        return;
      }
      this.set('sortProperty', sortOptions[indexOfActive + 1].property);
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
