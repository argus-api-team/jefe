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
          classNames: 'm--bg-argus',
        };
      case 'custom-market-value':
        return {
          name: 'Cote Argus personnalisée',
          classNames: 'm--bg-danger',
        };
      case 'prevar-value':
        return {
          name: 'Valeur Argus résiduelle',
          classNames: 'm--bg-info',
        };
      case 'past-market-value':
        return {
          name: 'Cote à date passé et prix du neuf',
          classNames: 'm--bg-focus',
        };
      case 'past-stock-market-value':
        return {
          name: 'Cote à date passé',
          classNames: 'm--bg-primary',
        };
      case 'part-exchange-value':
        return {
          name: 'Valeur de reprise',
          classNames: 'm--bg-success',
        };
      default:
        return offer;
    }
  }),
});
