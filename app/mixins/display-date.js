import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Mixin.create({
  moment: service(),
  i18n: service(),
  
  displayDate: computed('startDate', 'endDate', 'i18n.locale', function() {
    let format = 'MMMM YYYY'

    moment.locale(this.get('i18n.locale'));
    let formatedStartDate = moment(this.get('startDate')).format(format);
    if (isEmpty(this.get('endDate'))) {
      return this.get('i18n').t('makeList.displayDateSince', {
        'startDate': formatedStartDate.toLowerCase()
      });
    } else {
      let formatedEndDate = moment(this.get('endDate')).format(format);

      return this.get('i18n').t('makeList.displayDateWithEnd', {
        'startDate': formatedStartDate.toLowerCase(),
        'endDate': formatedEndDate.toLowerCase()
      });
    }
  }),
});
