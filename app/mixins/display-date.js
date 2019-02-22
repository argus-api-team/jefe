import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Mixin.create({
  intl: service(),

  displayDate: computed('startDate', 'endDate', 'intl.locale', function () {
    const format = 'MMMM YYYY';
    return this.getDisplayDate(format);
  }),

  displayDateCompact: computed('startDate', 'endDate', 'intl.locale', function () {
    const format = 'MMM YYYY';
    return this.getDisplayDate(format);
  }),
  displayDateDigit: computed('startDate', 'endDate', function () {
    const format = 'MM/YY';
    const formatedStartDate = moment(this.get('startDate')).format(format);
    if (isEmpty(this.get('endDate'))) {
      return formatedStartDate;
    }
    const formatedEndDate = moment(this.get('endDate')).format(format);
    return `${formatedStartDate} - ${formatedEndDate}`;
  }),

  getDisplayDate(format) {
    moment.locale(this.get('intl.locale'));
    const formatedStartDate = moment(this.get('startDate')).format(format);
    if (isEmpty(this.get('endDate'))) {
      return this.get('intl').t('makeList.displayDateSince', {
        startDate: formatedStartDate.toLowerCase(),
      });
    }
    const formatedEndDate = moment(this.get('endDate')).format(format);
    return this.get('intl').t('makeList.displayDateWithEnd', {
      startDate: formatedStartDate.toLowerCase(),
      endDate: formatedEndDate.toLowerCase(),
    });
  },
});
