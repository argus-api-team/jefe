import DS from 'ember-data';

export default DS.Model.extend({
  suggested: DS.attr('boolean'),
  versionId: DS.attr('string'),
});
