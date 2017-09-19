import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  moment: Ember.inject.service(),
  i18n: Ember.inject.service(),

  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  positionQuote: DS.attr('number'),

  categories: DS.hasMany({ async: true }),
  models: DS.hasMany({ async: true }),
  submodels: DS.hasMany({ async: true }),

  slug: Ember.computed('name', function() {
    return this.get('name').dasherize();
  }),

  displayDate: Ember.computed('startDate', 'endDate', 'i18n.locale', function() {
    let format = 'MMMM YYYY'

    moment.locale(this.get('i18n.locale'));
    let formatedStartDate = moment(this.get('startDate')).format(format);

    if (Ember.isEmpty(this.get('endDate'))) {
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

  logoURL: Ember.computed('slug', function() {
    return `//assets.largus.fr/logos/marques/${this.get('slug')}.png`
  })
});
