import Ember from 'ember';

export default Ember.Controller.extend({
  sortedSubmodels: Ember.computed('model.submodels', function() {
    return this.get('model.submodels').sortBy('name');
  })
});
