import Component from '@ember/component';
import { computed } from '@ember/object';
import DS from 'ember-data';
import { filter } from 'rsvp';

export default Component.extend({
  filteredPacks: computed('packs', 'category', function () {
    const packs = this.get('packs').toArray();
    const categoryId = this.get('category.id');
    if (!packs.length) {
      return false;
    }
    return DS.PromiseObject.create({
      promise: filter(packs, (pack) => {
        const filterPromise = pack.get('featureCategory').then((featureCategory) => {
          const featureCategoryId = featureCategory.get('id');
          return featureCategoryId === categoryId;
        });
        return filterPromise;
      }),
    });
  }),
});
