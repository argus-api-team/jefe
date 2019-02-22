import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('matching', {
      page: { size: 10 },
      sort: '-id',
    });
  },
  actions: {
    refreshModel() {
      this.refresh();
    },
  },
});
