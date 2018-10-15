import Controller from '@ember/controller';
import { computed } from '@ember/object'; // eslint-disable-line import/no-duplicates
import EmberObject from '@ember/object'; // eslint-disable-line import/no-duplicates
import ArrayProxy from '@ember/array/proxy';

export default Controller.extend({

  actions: {
    toggleEnergy(energyOption) {
      if (!energyOption.isActive) {
        energyOption.engineOptions.setEach('isActive', true);
      } else {
        energyOption.engineOptions.setEach('isActive', false);
      }
    },
  },

  filteredVersion: computed(
    'model.versions',
    'trimLevelOptions.@each.isActive',
    'gearboxOptions.@each.isActive',
    'transmissionOptions.@each.isActive',
    'engineOptions.@each.isActive',
    function () {
      const versionsArray = this.get('model.versions');
      const filters = [
        {
          filteredProp: 'trimLevel',
          activesFilters: this.get('trimLevelOptions').filterBy('isActive', true),
        },
        {
          filteredProp: 'lastEngine.content.id',
          activesFilters: this.get('engineOptions').filterBy('isActive', true),
        },
        {
          filteredProp: 'gearbox',
          activesFilters: this.get('gearboxOptions').filterBy('isActive', true),
        },
        {
          filteredProp: 'lastTransmission.content.id',
          activesFilters: this.get('transmissionOptions').filterBy('isActive', true),
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
    return this._generateFilterOptions(this.get('model.trimLevels'), 'name');
  }),

  engineOptions: computed('model.engines', function () {
    return this._generateFilterOptions(this.get('model.engines'), 'marketName', 'standardEmission');
  }),
  energyOptions: computed('model.energies', 'engineOptions', function () {
    return this._generateFilterOptions(this.get('model.energies'), 'name');
  }),

  gearboxOptions: computed('model.gearboxes', function () {
    return this._generateFilterOptions(this.get('model.gearboxes'), 'name');
  }),

  transmissionOptions: computed('model.transmissions', function () {
    return this._generateFilterOptions(this.get('model.transmissions'), 'drivenWheels');
  }),

  _generateFilterOptions(array, primaryProp, secondaryProp) {
    return array.map((item) => {
      const filterName = secondaryProp ? `${item.get(primaryProp)} -- ${item.get(secondaryProp)}` : item.get(primaryProp);
      let filter = EmberObject.extend({
        id: item.get('id'),
        name: filterName,
        inputId: `${item.get(primaryProp)}-${item.get('id')}`,
        isActive: false,
      });
      if (item.get('constructor.modelName') === 'engine') {
        filter = filter.extend({
          energyId: item.belongsTo('energy').id(),
        });
      }
      if (item.get('constructor.modelName') === 'energy') {
        const engineOptions = this.get('engineOptions');
        filter = filter.extend({
          isActive: computed('engineOptions.@each.isActive', function () {
            return this.get('engineOptions').isEvery('isActive', true);
          }),
          engineOptions: ArrayProxy.create({
            content: engineOptions.filter(engineOption => engineOption.get('energyId') === item.get('id')),
          }),
        });
      }
      return filter.create();
    }).sortBy('name');
  },
});
