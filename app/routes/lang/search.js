import Ember from 'ember';

export default Ember.Route.extend({
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
