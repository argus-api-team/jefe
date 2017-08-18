import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  locale: Ember.computed.alias('i18n.locale'),
  noLogoUrl: Ember.computed('i18n.locale', function() {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),

  didRender() {
    var context = this;
    this._detectMissingImg();
    this.$('ul').listnav({
      filterSelector: '[data-role=name]',
      initLetter: 'a',
      allText: 'ALL',
      includeNums: false,
      noMatchText: context.get('i18n').t('makeList.noMatching')
    })
  },

  _detectMissingImg: function() {
    var context = this;

    Ember.$('.list-thumb img').on('error', function() {
      Ember.$('this').attr('src', context.get('noLogoUrl'));
    })
  }
});
