import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      valorizations: this.get('store').query('valorization', {
        include: 'values',
        page: { size: 500 },
        sort: '-id'
      }),
      batches: this.get('store').query('batch', {
        include: 'valorizations.values',
        page: { size: 500 },
      }),
    });
  },
});
