import DS from 'ember-data';
import DisplayDateMixin from '../mixins/display-date';

export default DS.Model.extend(DisplayDateMixin, {
  name: DS.attr('string'),
  shortNicename: DS.attr('string'),
  fullNicename: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  bodyType: DS.attr('string'),
  legacyId: DS.attr('number'),
  bodyTypeClassifiedAd: DS.attr('string'),
  position: DS.attr('number'),
  segment: DS.attr('string'),
  segmentReferentiel: DS.attr('string'),
  segmentEurope: DS.attr('string'),

  make: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  submodel: DS.belongsTo({ async: true }),
  phases: DS.hasMany({ async: true }),
});
