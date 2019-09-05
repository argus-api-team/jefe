import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';


export default DS.Model.extend(HasManyQuery.ModelMixin, {
  priceExcludingVat: DS.attr('number'),
  priceIncludingVat: DS.attr('number'),
  startDate: DS.attr('date'),
  startDateType: DS.attr('string'),
  endDate: DS.attr('date'),
  endDateType: DS.attr('string'),
  manufacturerSpec1: DS.attr('string'),
  manufacturerSpec2: DS.attr('string'),
  manufacturerSpec3: DS.attr('string'),

  version: DS.belongsTo({ async: true }),
  phase: DS.belongsTo({ async: true }),
  generation: DS.belongsTo({ async: true }),
  submodel: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  make: DS.belongsTo({ async: true }),
  features: DS.hasMany({
    async: true,
    inverse: null,
  }),
  standardFeatures: DS.hasMany({
    async: true,
    inverse: null,
  }),
  optionalFeatures: DS.hasMany({
    async: true,
    inverse: null,
  }),
  equipments: DS.hasMany({
    async: true,
    inverse: null,
  }),
  standardEquipments: DS.hasMany({
    async: true,
    inverse: null,
  }),
  optionalEquipments: DS.hasMany({
    async: true,
    inverse: null,
  }),
  packs: DS.hasMany({
    async: true,
    inverse: null,
  }),
  standardPacks: DS.hasMany({
    async: true,
    inverse: null,
  }),
  optionalPacks: DS.hasMany({
    async: true,
    inverse: null,
  }),
  weight: DS.belongsTo({ async: true }),
  tyre: DS.belongsTo({ async: true }),
  transmission: DS.belongsTo({ async: true }),
  platform: DS.belongsTo({ async: true }),
  performance: DS.belongsTo({ async: true }),
  consumption: DS.belongsTo({ async: true }),
  dimension: DS.belongsTo({ async: true }),
  boot: DS.belongsTo({ async: true }),
  engine: DS.belongsTo({ async: true }),
});
