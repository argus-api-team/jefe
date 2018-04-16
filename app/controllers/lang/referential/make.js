import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { filter } from 'rsvp';
import DS from 'ember-data';

export default Controller.extend({

  filteredCategories: computed('model.make.categories.@each.showCategory', function () {
    const categories = this.get('model.make.categories');
    return categories.filterBy('showCategory');
  }),

  filteredModels: computed('filteredCategories', 'model.make.model.category', function () {
    const makeModels = this.get('model.make.models');
    const filteredCategories = this.get('filteredCategories');

    return DS.PromiseArray.create({
      promise: filter(makeModels.toArray(), (makeModel) => {
        const promise = makeModel.get('categories').then((modelCategories) => {
          let modelIsDisplayed = false;
          modelCategories.forEach((modelCategory) => {
            const modelCategoryName = modelCategory.get('name');
            if (filteredCategories.isAny('name', modelCategoryName)) {
              modelIsDisplayed = true;
            }
          });
          return modelIsDisplayed;
        });
        return promise;
      }),
    });
  }),
});
