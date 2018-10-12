import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Component.extend({

  sortProperty: '',
  sortOrder: 'desc',

  versionSorting: computed('sortProperty', 'sortOrder', function () {
    const sortProperty = this.get('sortProperty');
    const sortOrder = this.get('sortOrder');
    if (sortProperty) {
      return [`${sortProperty}:${sortOrder}`, `id:${sortOrder}`];
    }
    return [`id:${sortOrder}`];
  }),

  sortedVersions: sort('versionsArray', 'versionSorting'),

  idSorting: computed('sortProperty', function () {
    const sortProperty = this.get('sortProperty');
    return [
      {
        name: 'Id',
        property: 'id',
        isActive: sortProperty === 'id',
      },
    ];
  }),
  nameSorting: computed('sortProperty', function () {
    const sortProperty = this.get('sortProperty');
    return [
      {
        name: 'Name',
        property: 'name',
        isActive: sortProperty === 'name',
      },
      {
        name: 'Finitions',
        property: 'trimLevel',
        isActive: sortProperty === 'trimLevel',
      },
    ];
  }),
  dateSorting: computed('sortProperty', function () {
    const sortProperty = this.get('sortProperty');
    return [
      {
        name: 'startDate',
        property: 'startDate',
        isActive: sortProperty === 'startDate',
      },
      {
        name: 'endDate',
        property: 'endDate',
        isActive: sortProperty === 'endDate',
      },
    ];
  }),
  engineSorting: computed('sortProperty', function () {
    const sortProperty = this.get('sortProperty');
    return [
      {
        name: 'Energy',
        property: 'energy.name',
        isActive: sortProperty === 'energy.name',
      },
      {
        name: 'Engine',
        property: 'lastEngine.content.marketName',
        isActive: sortProperty === 'lastEngine.content.marketName',
      },
      {
        name: 'Power',
        property: 'lastEngine.content.dinHorsepower',
        isActive: sortProperty === 'lastEngine.content.dinHorsepower',
      },
    ];
  }),
  driveSorting: computed('sortProperty', function () {
    const sortProperty = this.get('sortProperty');
    return [
      {
        name: 'Gearbox',
        property: 'gearbox.numberOfGears',
        isActive: sortProperty === 'gearbox.numberOfGears',
      },
      {
        name: 'Transmission',
        property: 'version.lastTransmission.content.drivenWheels',
        isActive: sortProperty === 'version.lastTransmission.content.drivenWheels',
      },
    ];
  }),
});
