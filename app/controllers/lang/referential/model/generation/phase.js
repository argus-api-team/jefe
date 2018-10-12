import Controller from '@ember/controller';
import { computed } from '@ember/object';
// import DS from 'ember-data';

export default Controller.extend({

  filteredVersion: computed('model', 'trimLevelOptions.@each.isActive', function () {
    const versionsArray = this.get('model');
    const activeTrimLevelOptions = this.get('trimLevelOptions').filterBy('isActive', true);
    return versionsArray.filter((version) => {
      if (activeTrimLevelOptions.length) {
        const versionTrimLevel = version.get('trimLevel');
        return activeTrimLevelOptions.isAny('name', versionTrimLevel);
      }
      return true;
    });
  }),

  trimLevelOptions: computed('model', function () {
    const versionArray = this.get('model');
    const trimLevelArray = [];
    versionArray.forEach((version) => {
      trimLevelArray.push({
        name: version.get('trimLevel'),
        isActive: false,
      });
    });
    return trimLevelArray.uniqBy('name').sortBy('name');
  }),
});
