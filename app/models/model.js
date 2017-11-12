import DS from 'ember-data';
import FeatureModelMixin from '../mixins/display-date'

export default DS.Model.extend(FeatureModelMixin, {

  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  legacyId: DS.attr('number'),
  positionQuote: DS.attr('number'),

  make: DS.belongsTo({ async: true }),
  submodels: DS.hasMany({ async: true }),
  categories: DS.hasMany({ async: true }),

});
