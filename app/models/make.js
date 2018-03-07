import { computed } from '@ember/object';
import DS from 'ember-data';
import DisplayDateMixin from '../mixins/display-date';

export default DS.Model.extend(DisplayDateMixin, {

  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  positionQuote: DS.attr('number'),

  categories: DS.hasMany({ async: true }),
  models: DS.hasMany({ async: true }),
  submodels: DS.hasMany({ async: true }),

  slug: computed('name', function () {
    return this.get('name').dasherize();
  }),

  logoURL: computed('slug', function () {
    return `//assets.largus.fr/logos/marques/${this.get('slug')}.png`;
  }),
});
