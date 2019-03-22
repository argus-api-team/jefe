import DS from 'ember-data';
import { computed } from '@ember/object';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  name: DS.attr('string'),

  makes: DS.hasMany({ async: true }),
  models: DS.hasMany({ async: true }),
  submodels: DS.hasMany({ async: true }),


  // Property to manage filters of submodels view
  showCategory: false,
  categoryInputId: computed('id', function () {
    const categoryId = this.get('id');
    return `category-${categoryId}`;
  }),
});
