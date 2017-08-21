import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  locale: Ember.computed.alias('i18n.locale'),
  noLogoUrl: Ember.computed('i18n.locale', function() {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),

  didRender() {
    this._detectMissingImg();
  },

  _detectMissingImg: function() {
    var context = this;

    Ember.$('img').on('error', function() {
      Ember.$(this).addClass('no-logo')
      Ember.$(this).attr('src', context.get('noLogoUrl'));
    })
  },
});
