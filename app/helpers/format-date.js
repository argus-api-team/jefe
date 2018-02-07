import Helper from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import { isEmpty } from '@ember/utils';
import $ from 'jquery';


export function formatDate([date], args) {
  let format = 'MMMM YYYY';
  moment.locale($('html').attr('lang'));

  if (isEmpty(date)) {
    return htmlSafe(
      `<span class="font-grey-silver">${args.noDateText}</span>`
    );
  } else {
    return moment(date).format(format);
  }
}

export default Helper.helper(formatDate);
