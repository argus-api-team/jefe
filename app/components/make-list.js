import Ember from 'ember';

export default Ember.Component.extend({
  infinityLoadAction: 'infinityLoad',

  actions: {
    infinityLoad(infinityModel) {
      this.sendAction('infinityLoadAction', infinityModel);
    }
  }
});
