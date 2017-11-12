import Ember from 'ember';

export function formatDate([date], args) {
  let format = 'MMMM YYYY'
  moment.locale(Ember.$('html').attr('lang'));

  if (Ember.isEmpty(date)) {
    return Ember.String.htmlSafe(
      `<span class="font-grey-silver">${args.noDateText}</span>`
    );
  } else {
    return moment(date).format(format);
  }
}

export default Ember.Helper.helper(formatDate);
