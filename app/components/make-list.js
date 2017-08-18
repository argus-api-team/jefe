import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  locale: Ember.computed.alias('i18n.locale'),
  noLogoUrl: Ember.computed('i18n.locale', function() {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),
  infinityLoadAction: 'infinityLoad',

  actions: {
    infinityLoad(infinityModel) {
      this.sendAction('infinityLoadAction', infinityModel);
    }
  },

  didRender() {
    this._detectMissingImg();
  },

  _detectMissingImg: function() {
    var context = this;

    Ember.$('.list-thumb img').on('error', function() {
      Ember.$(this).attr('src', context.get('noLogoUrl'));
    })
  }
});
