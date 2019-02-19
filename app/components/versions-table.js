import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({

  classNames: ['versions-table'],

  localizedReferentials: service(),
  intl: service(),

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
    const intl = this.get('intl');
    const enginesLength = this.get('enginesLength');
    return [
      {
        name: intl.t('versionsTable.labels.trim'),
        option: 'trim',
        class: 'col-xl-4',
        properties: [
          'trimLevel',
          'name',
          'lastPeriod.content.priceIncludingVat',
        ],
        isActive: sortBy === 'trim',
      },
      {
        name: enginesLength ? intl.t('versionsTable.labels.engines') : intl.t('versionsTable.labels.energies'),
        option: 'engines',
        class: '',
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
        name: intl.t('versionsTable.labels.gearboxes'),
        option: 'gearboxes',
        class: '',
        properties: [
          'gearbox.name',
          'lastTransmission.content.drivenWheels',
          'lastPeriod.content.priceIncludingVat',
        ],
        isActive: sortBy === 'gearboxes',
      },
      {
        name: intl.t('versionsTable.labels.transmissions'),
        option: 'transmissions',
        class: '',
        wideOnly: true,
        properties: [
          'lastTransmission.content.drivenWheels',
          'gearbox.name',
          'lastPeriod.content.priceIncludingVat',
        ],
        isActive: sortBy === 'transmissions',
      },
      {
        name: intl.t('versionsTable.labels.date'),
        option: 'date',
        class: 'versions-header__date',
        properties: [
          'startDate',
          'endDate',
        ],
        isActive: sortBy === 'date',
      },
      {
        name: intl.t('versionsTable.labels.price'),
        option: 'price',
        class: 'versions-header__price',
        properties: [
          'lastPeriod.content.priceIncludingVat',
          'name',
        ],
        isActive: sortBy === 'price',
      },
      {
        name: intl.t('versionsTable.labels.id'),
        option: 'id',
        class: 'versions-header__id',
        properties: ['id'],
        isActive: sortBy === 'id',
      },
    ];
  }),
});
