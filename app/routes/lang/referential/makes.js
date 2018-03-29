import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    letter: {
      replace: true,
    },
  },

  model() {
    return this.store.query('make', {
      page: { size: 500 },
      sort: 'name',
    });
  },
});
