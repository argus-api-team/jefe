import Controller from '@ember/controller';
import DS from 'ember-data';
import { computed } from '@ember/object';
import { filter } from 'rsvp';

export default Controller.extend({
  queryParams: ['searchTerm'],
  searchTerm: '',

  filteredCategories: computed('model.categories.@each.showCategory', function () {
    const categories = this.get('model.categories');
    return categories.filterBy('showCategory');
  }),

  filteredMakesByCategory: computed('filteredCategories', 'model.makes', function () {
    const makes = this.get('model.makes');
    const filteredCategories = this.get('filteredCategories');
    return DS.PromiseArray.create({
      promise: filter(makes.toArray(), (make) => {
        const promise = make.get('categories').then((makeCategories) => {
          let modelIsDisplayed = false;
          makeCategories.forEach((makeCategory) => {
            const makeCategoryName = makeCategory.get('name');
            if (filteredCategories.isAny('name', makeCategoryName)) {
              modelIsDisplayed = true;
            }
          });
          return modelIsDisplayed;
        });
        return promise;
      }),
    });
  }),

  filteredMakes: computed('filteredMakesByCategory.content', 'searchTerm', function () {
    const makes = this.get('filteredMakesByCategory.content');
    if (!makes) {
      return [];
    }
    const searchTerm = this.get('searchTerm');
    const filteredMakes = makes.filter(make => (make.get('name').toLowerCase().indexOf(searchTerm) > -1));
    return filteredMakes;
  }),

});
