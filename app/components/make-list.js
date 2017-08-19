import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    var context = this;
    this.$('ul').listnav({
      filterSelector: '[data-role=name]',
      initLetter: 'a',
      allText: 'ALL',
      includeNums: false,
      noMatchText: context.get('i18n').t('makeList.noMatching')
    })
    this.$('.ln-no-match').addClass('mt-list-item')
  },

  actions: {
    viewMake(make) {
      this.sendAction('viewMake', make)
    }
  }
});
