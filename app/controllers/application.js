import Ember from 'ember';

export default Ember.Controller.extend({
  isLogin: Ember.computed('currentPath', function() {
    return this.get('currentPath') === 'lang.login';
  }) 
});