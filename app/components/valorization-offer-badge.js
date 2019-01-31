import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: ['offer-badge'],
  classNameBindings: ['offerProperties.classNames'],

  offerProperties: computed('offer', function () {
    const offer = this.get('offer');
    switch (offer) {
      case 'extended-market-value':
        return {
          name: 'Valeurs Argus de marché',
          tKey: 'valorization.offers.extended',
          classNames: 'm--bg-argus',
        };
      case 'custom-market-value':
        return {
          name: 'Cote Argus personnalisée',
          tKey: 'valorization.offers.custom',
          classNames: 'm--bg-danger',
        };
      case 'prevar-value':
        return {
          name: 'Valeur Argus résiduelle',
          tKey: 'valorization.offers.residual',
          classNames: 'm--bg-info',
        };
      case 'past-stock-market-value':
        return {
          name: 'Cote à date passé et prix du neuf',
          tKey: 'valorization.offers.pastStock',
          classNames: 'm--bg-focus',
        };
      case 'past-market-value':
        return {
          name: 'Cote à date passé',
          tKey: 'valorization.offers.past',
          classNames: 'm--bg-primary',
        };
      case 'part-exchange-value':
        return {
          name: 'Valeur de reprise',
          tKey: 'valorization.offers.tradein',
          classNames: 'm--bg-success',
        };
      default:
        return offer;
    }
  }),
});
