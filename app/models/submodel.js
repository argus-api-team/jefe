import DS from 'ember-data';
import { computed } from '@ember/object';
import HasManyQuery from 'ember-data-has-many-query';
import DisplayDateMixin from '../mixins/display-date';

export default DS.Model.extend(DisplayDateMixin, HasManyQuery.ModelMixin, {
  name: DS.attr('string'),
  shortNicename: DS.attr('string'),
  fullNicename: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  legacyId: DS.attr('number'),

  make: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  category: DS.belongsTo({ async: true }),
  generations: DS.hasMany({ async: true }),
  versions: DS.hasMany({ async: true }),
  periods: DS.hasMany({ async: true }),

  // Computed properties

  generationSorting: computed('generations.length', function () { // eslint-disable-line
    return ['sortableStartDate:desc'];
  }),
  sortedGenerations: computed.sort('generations', 'generationSorting'),
});

