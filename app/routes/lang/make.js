import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('make', params.id, {
      include: 'submodels,models'
    })
  }
});
