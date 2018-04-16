import Component from '@ember/component';
import { computed } from '@ember/object';
import DS from 'ember-data';
import { filter } from 'rsvp';

export default Component.extend({
  classNames: ['categery-standard-equipments'],
  filteredEquipments: computed('equipments', 'category', function () {
    const equipments = this.get('equipments').toArray();
    const categoryId = this.get('category.id');
    if (!equipments.length) {
      return false;
    }
    return DS.PromiseObject.create({
      promise: filter(equipments, (equipment) => {
        const filterPromise = equipment.get('featureCategory').then((featureCategory) => {
          const featureCategoryId = featureCategory.get('id');
          return featureCategoryId === categoryId;
        });
        return filterPromise;
      }),
    });
  }),
});
