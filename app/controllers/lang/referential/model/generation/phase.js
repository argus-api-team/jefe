import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  filteredVersion: computed(
    'model.versions',
    'trimLevelOptions.@each.isActive',
    'gearboxesOptions.@each.isActive',
    'transmissionsOptions.@each.isActive',
    'enginesOptions.@each.isActive',
    function () {
      const versionsArray = this.get('model.versions');
      const filters = [
        {
          filteredProp: 'trimLevel',
          activesFilters: this.get('trimLevelOptions').filterBy('isActive', true),
        },
        {
          filteredProp: 'lastEngine.content.id',
          activesFilters: this.get('enginesOptions').filterBy('isActive', true),
        },
        {
          filteredProp: 'gearbox',
          activesFilters: this.get('gearboxesOptions').filterBy('isActive', true),
        },
        {
          filteredProp: 'lastTransmission.content.id',
          activesFilters: this.get('transmissionsOptions').filterBy('isActive', true),
        },
      ];
      return versionsArray.filter((version) => {
        let displayVersion = true;
        filters.forEach((filter) => {
          if (filter.activesFilters.length && displayVersion) {
            const versionFilteredProp = filter.filteredProp === 'gearbox' ? version.belongsTo(filter.filteredProp).id() : version.get(filter.filteredProp);
            displayVersion = filter.activesFilters.isAny('id', versionFilteredProp);
          }
        });
        return displayVersion;
      });
    },
  ),

  trimLevelOptions: computed('model.trimLevels', function () {
    return this._generateFilterOptions(this.get('model.trimLevels'), 'trimLevel');
  }),
  enginesOptions: computed('model.engines', function () {
    return this._generateFilterOptions(this.get('model.engines'), 'marketName', 'standardEmission');
  }),
  gearboxesOptions: computed('model.gearboxes', function () {
    return this._generateFilterOptions(this.get('model.gearboxes'), 'name');
  }),
  transmissionsOptions: computed('model.transmissions', function () {
    return this._generateFilterOptions(this.get('model.transmissions'), 'drivenWheels');
  }),
  _generateFilterOptions(array, primaryProp, secondaryProp) {
    return array.map((item) => {
      const isTrimLevel = primaryProp === 'trimLevel';
      let filterName;
      if (isTrimLevel) {
        filterName = item;
      } else {
        filterName = secondaryProp ? `${item.get(primaryProp)} -- ${item.get(secondaryProp)}` : item.get(primaryProp);
      }
      const filter = {
        id: isTrimLevel ? item : item.get('id'),
        name: isTrimLevel ? item : filterName,
        inputId: isTrimLevel ? item : `${filterName}-${item.get('id')}`,
        isActive: false,
      };
      return filter;
    }).sortBy('name');
  },
});
