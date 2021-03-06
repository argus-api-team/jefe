import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import c3 from 'c3';

export default Component.extend({
  intl: service(),
  didInsertElement() {
    this._initChart();
  },

  _initChart() {
    const component = this;
    const componentId = `#${this.get('elementId')}`;
    const chart = c3.generate({
      bindto: componentId,
      data: {
        x: 'x',
        columns: [
          this.get('periodsStartDates'),
          this.get('periodsPrices'),
        ],
        onclick(d) {
          component.updateSelectedPeriod(d);
        },
        selection: {
          enabled: true,
          multiple: false,
        },
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
            culling: {
              max: 10,
            },
            rotate: -45,
          },
        },
        y: {
          tick: {
            format(d) { return `${d}€`; },
          },
        },
      },
      grid: {
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      zoom: {
        enabled: false,
      },
    });
    this.set('chart', chart);
    this.updateSelectedPoint();
  },

  periodsPrices: computed('periods', function () {
    const periods = this.get('periods');
    const periodsPrices = periods.mapBy('priceIncludingVat');
    const intl = this.get('intl');
    const graphLegend = intl.t('vehicleSheet.priceAndQuote.priceEvolution.legend');
    periodsPrices.unshift(graphLegend);
    return periodsPrices;
  }),

  periodsStartDates: computed('periods', function () {
    const periods = this.get('periods');
    const periodsStartDates = periods.mapBy('startDate');
    periodsStartDates.unshift('x');
    return periodsStartDates;
  }),

  selectedPeriodObserver: observer('selectedPeriod', function () {    // eslint-disable-line
    this.updateSelectedPoint();
  }),

  updateSelectedPoint() {
    const periods = this.get('periods');
    const selectedPeriod = this.get('selectedPeriod');
    const chart = this.get('chart');
    const indexOfSelectedPeriod = periods.indexOf(selectedPeriod);
    const intl = this.get('intl');
    const graphLegend = intl.t('vehicleSheet.priceAndQuote.priceEvolution.legend');
    chart.select([graphLegend], [indexOfSelectedPeriod], true);
  },

  updateSelectedPeriod(selectedData) {
    const periods = this.get('periods');
    const selectedPeriod = periods.objectAt(selectedData.index);
    const selectedPeriodId = selectedPeriod.get('id');
    this.set('selectedPeriod', selectedPeriod);
    this.set('selectedPeriodId', selectedPeriodId);
  },

  willDestroy() {
    const chart = this.get('chart');
    chart.destroy();
  },

});
