import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Mixin.create({
  i18n: service(),

  displayDate: computed('startDate', 'endDate', 'i18n.locale', function () {
    const format = 'MMMM YYYY';
    return this.getDisplayDate(format);
  }),

  displayDateCompact: computed('startDate', 'endDate', 'i18n.locale', function () {
    const format = 'MMM YYYY';
    return this.getDisplayDate(format);
  }),


  getDisplayDate(format) {
    moment.locale(this.get('i18n.locale'));
    const formatedStartDate = moment(this.get('startDate')).format(format);
    if (isEmpty(this.get('endDate'))) {
      return this.get('i18n').t('makeList.displayDateSince', {
        startDate: formatedStartDate.toLowerCase(),
      });
    }
    const formatedEndDate = moment(this.get('endDate')).format(format);
    return this.get('i18n').t('makeList.displayDateWithEnd', {
      startDate: formatedStartDate.toLowerCase(),
      endDate: formatedEndDate.toLowerCase(),
    });
  },
});
