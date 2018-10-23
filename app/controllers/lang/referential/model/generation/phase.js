import Controller from '@ember/controller';
import { computed } from '@ember/object'; // eslint-disable-line import/no-duplicates
import EmberObject from '@ember/object'; // eslint-disable-line import/no-duplicates
import ArrayProxy from '@ember/array/proxy';

export default Controller.extend({
  queryParams: Object.freeze(['engines', 'trimLevels', 'gearboxes', 'transmissions', 'sortBy', 'sortOrder']),
  init() {
    this._super(...arguments);
    const queryParams = this.get('queryParams');
    this.set('sortOrder', this.get('sortOrder') ? this.get('sortOrder') : 'asc');
    queryParams.forEach((queryParam) => {
      if (!this.get(queryParam)) {
        this.set(queryParam, []);
      }
    });
  },

  actions: {
    toggleEnergy(energyOption) {
      const engineOptions = energyOption.get('engineOptions');
      const enginesIds = engineOptions.mapBy('id');
      const queryParam = this.get('engines');
      queryParam.removeObjects(enginesIds);
      if (!energyOption.isActive) {
        engineOptions.setEach('isActive', true);
        queryParam.pushObjects(enginesIds);
      } else {
        engineOptions.setEach('isActive', false);
      }
    },
    toggleFilter(filterOption, queryParam) {
      filterOption.toggleProperty('isActive');
      if (filterOption.get('isActive')) {
        this.get(queryParam).pushObject(filterOption.get('id'));
      } else {
        this.get(queryParam).removeObject(filterOption.get('id'));
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
    return this._generateFilterOptions(this.get('model.trimLevels'), 'name', null, 'trimLevels');
  }),

  engineOptions: computed('model.engines', function () {
    return this._generateFilterOptions(this.get('model.engines'), 'marketName', 'standardEmission', 'engines');
  }),
  energyOptions: computed('model.energies', 'engineOptions', function () {
    return this._generateFilterOptions(this.get('model.energies'), 'name');
  }),

  gearboxOptions: computed('model.gearboxes', function () {
    return this._generateFilterOptions(this.get('model.gearboxes'), 'name', null, 'gearboxes');
  }),

  transmissionOptions: computed('model.transmissions', function () {
    return this._generateFilterOptions(this.get('model.transmissions'), 'drivenWheels', 'marketingName', 'transmissions');
  }),

  _generateFilterOptions(array, primaryProp, secondaryProp, queryParamName) {
    return array.map((item) => {
      const secondaryPropValue = secondaryProp ? item.get(secondaryProp) : null;
      const filterName = secondaryPropValue ? `${item.get(primaryProp)} -- ${secondaryPropValue}` : item.get(primaryProp);
      const filterIsActive = queryParamName ? this.get(queryParamName).indexOf(item.get('id')) !== -1 : false;
      let filter = EmberObject.extend({
        id: item.get('id'),
        name: filterName,
        inputId: `${item.get(primaryProp)}-${item.get('id')}`,
        isActive: filterIsActive,
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
