import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      makes: this.store.query('make', {
        page: { size: 500 },
        sort: 'name',
      }),
      categories: this.store.findAll('category'),
    });
  },
});
