import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('make', {
      page: { size: 500 },
      sort: 'name',
    });
  },
});
