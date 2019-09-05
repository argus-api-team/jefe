import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import moment from 'moment';

export default Helper.extend({
  intl: service(),
  localeChanged: observer('intl.locale', function() {  // eslint-disable-line
    this.recompute();
  }),

  compute([startDate, endDate], { compact }) {
    let format = 'MMMM YYYY';
    if (compact) {
      format = 'MMM YYYY';
    }
    const formatedStartDate = moment(startDate).format(format);
    if (isEmpty(this.get('endDate'))) {
      return this.get('intl').t('makeList.displayDateSince', {
        startDate: formatedStartDate.toLowerCase(),
      });
    }
    const formatedEndDate = moment(endDate).format(format);
    return this.get('intl').t('makeList.displayDateWithEnd', {
      startDate: formatedStartDate.toLowerCase(),
      endDate: formatedEndDate.toLowerCase(),
    });
  },


});
