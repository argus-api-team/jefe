import DS from 'ember-data';
import { sort } from '@ember/object/computed';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  name: DS.attr('string'),
  shortNicename: DS.attr('string'),
  fullNicename: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  legacyId: DS.attr('number'),
  positionQuote: DS.attr('number'),

  make: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  category: DS.belongsTo({ async: true }),
  generations: DS.hasMany({ async: true }),
  versions: DS.hasMany({ async: true }),
  periods: DS.hasMany({ async: true }),

  // Computed properties

  generationSorting: Object.freeze(['startDate:desc']),
  sortedGenerations: sort('generations', 'generationSorting'),
});
