import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  sortableStartDate: computed('startDate', function () {
    if (this.get('startDate')) {
      return this.get('startDate').format('YYYY-MM-DD');
    }
    return null;
  }),
  sortableEndDate: computed('endDate', function () {
    if (this.get('endDate')) {
      return this.get('endDate').format('YYYY-MM-DD');
    }
    return null;
  }),
});
