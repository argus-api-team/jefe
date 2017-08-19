import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('make', {
      page: { size: 500 },
      sort: 'name'
    })
  }
});
