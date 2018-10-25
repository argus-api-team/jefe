import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Component.extend({

  sortBy: '',
  sortOrder: 'asc',

  versionSorting: computed('sortOptions.@each.isActive', 'sortOrder', function () {
    const sortOption = this.get('sortOptions').findBy('isActive', true);
    const sortOrder = this.get('sortOrder');
    if (sortOption) {
      return sortOption.properties.map(sortProperty => `${sortProperty}:${sortOrder}`);
    }
    return ['id:desc'];
  }),

  sortedVersions: sort('versionsArray', 'versionSorting'),
  sortOptions: computed('sortBy', function () {
    const sortBy = this.get('sortBy');
    return [
      {
        name: 'Id',
        option: 'id',
        properties: ['id'],
        isActive: sortBy === 'id',
      },
      {
        name: 'Finishes',
        option: 'finishes',
        properties: [
          'trimLevel',
          'name',
          'lastPeriod.content.priceIncludingVat',
        ],
        isActive: sortBy === 'finishes',
      },
      {
        name: 'Engine',
        option: 'engines',
        properties: [
          'energy.name',
          'lastEngine.content.dinHorsepower',
          'lastEngine.content.standardEmission',
          'lastEngine.content.marketName',
          'lastPeriod.content.priceIncludingVat',
        ],
        isActive: sortBy === 'engines',
      },
      {
        name: 'Tranmission',
        option: 'transmissions',
        properties: [
          'gearbox.name',
          'lastTransmission.content.drivenWheels',
        ],
        isActive: sortBy === 'transmissions',
      },
      {
        name: 'Date',
        option: 'date',
        properties: [
          'startDate',
          'endDate',
        ],
        isActive: sortBy === 'date',
      },
      {
        name: 'Price',
        option: 'price',
        properties: [
          'lastPeriod.content.priceIncludingVat',
          'name',
        ],
        isActive: sortBy === 'price',
      },
    ];
  }),
});
