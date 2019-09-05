import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import moment from 'moment';

export default Helper.extend({
  compute([startDate, endDate]) {
    const format = 'MM/YY';
    const formatedStartDate = moment(startDate).format(format);
    if (isEmpty(endDate)) {
      return formatedStartDate;
    }
    const formatedEndDate = moment(endDate).format(format);
    return `${formatedStartDate} - ${formatedEndDate}`;
  },
});
