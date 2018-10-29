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
  sortOptions: computed('sortBy', 'enginesLength', function () {
    const sortBy = this.get('sortBy');
    const i18n = this.get('i18n');
    const enginesLength = this.get('enginesLength');
    return [
      {
        name: i18n.t('versionsTable.labels.finishes'),
        option: 'finishes',
        properties: [
          'trimLevel',
          'name',
          'lastPeriod.content.priceIncludingVat',
        ],
        isActive: sortBy === 'finishes',
      },
      {
        name: enginesLength ? i18n.t('versionsTable.labels.engines') : i18n.t('versionsTable.labels.energies'),
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
        name: i18n.t('versionsTable.labels.transmissions'),
        option: 'transmissions',
        properties: [
          'gearbox.name',
          'lastTransmission.content.drivenWheels',
        ],
        isActive: sortBy === 'transmissions',
      },
      {
        name: i18n.t('versionsTable.labels.date'),
        option: 'date',
        properties: [
          'startDate',
          'endDate',
        ],
        isActive: sortBy === 'date',
      },
      {
        name: i18n.t('versionsTable.labels.price'),
        option: 'price',
        properties: [
          'lastPeriod.content.priceIncludingVat',
          'name',
        ],
        isActive: sortBy === 'price',
      },
      {
        name: i18n.t('versionsTable.labels.id'),
        option: 'id',
        properties: ['id'],
        isActive: sortBy === 'id',
      },
    ];
  }),
});
