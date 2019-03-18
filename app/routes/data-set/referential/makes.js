import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  queryParams: {
    letter: {
      replace: true,
    },
  },

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
