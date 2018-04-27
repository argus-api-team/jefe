import DS from 'ember-data';

export default DS.Model.extend({
  legacyId: DS.attr('string'),
  releasedAt: DS.attr('string'),
});
