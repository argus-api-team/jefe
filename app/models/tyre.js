import DS from 'ember-data';

export default DS.Model.extend({
  front: DS.attr('string'),
  rear: DS.attr('string'),
  sparewheelType: DS.attr('string'),
  wheelType: DS.attr('string'),
  constructionType: DS.attr('string'),
});
