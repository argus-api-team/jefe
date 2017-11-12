import Component from '@ember/component';

export default Component.extend({
  letter: 'a',

  didUpdateAttrs() {
    this._removeListNavForReRender();
  },

  didRender() {
    let context = this;
    this.$('ul').listnav({
      filterSelector: '[data-role=name]',
      initLetter: context.get('letter'),
      allText: 'ALL',
      includeNums: false,
      noMatchText: context.get('i18n').t('makeList.noMatching'),
      onClick: function(letter) {
        context.updateLetter(letter);
      }
    })
    this.$('.ln-no-match').addClass('mt-list-item');
  },

  actions: {

    updateLetter(letter) {
      this.sendAction('updateLetter', letter);
    }
  },

  _removeListNavForReRender() {
    this.$('#make-list-nav, .ln-no-match').remove();
  }
});
