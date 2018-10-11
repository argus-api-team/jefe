import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  didReceiveAttrs() {
    const parentFilterType = this.get('parentFilterType');
    const filterOptions = this.get('filterOptions');
    if(filterOptions && filterOptions.length === 1) {
      // Clean this hack later
      setTimeout(() => {
        this.set('filterId', filterOptions.objectAt(0).get('id'));
      }, 0)
    }
    else if(parentFilterType && !this.get('parentFilterId')) {
      this.set('filterId', '');
    }

  },
  filterId: '',
});
