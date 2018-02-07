import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
  queryParams: {
    letter: {
      replace: true
    }
  },

  model() {
    return this.store.query('make', {
      page: { size: 500 },
      sort: 'name'
    })
  }
});
