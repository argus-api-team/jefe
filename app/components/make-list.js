import Component from '@ember/component';

export default Component.extend({
  letter: 'a',

  didUpdateAttrs() {
    this._removeListNavForReRender();
  },

  didRender() {
    this._removeListNavForReRender();
    const context = this;
    this.$('.make-list').listnav({
      filterSelector: '[data-role=name]',
      initLetter: context.get('letter'),
      allText: 'ALL',
      includeNums: false,
      noMatchText: context.get('i18n').t('makeList.noMatching'),
      onClick(letter) {
        context.updateLetter(letter);
      },
    });
    this.$('.ln-no-match').addClass('mt-list-item');
  },

  updateLetter(letter) {
    this.get('updateLetter')(letter);
  },

  _removeListNavForReRender() {
    this.$('#make-list-nav, .ln-no-match').remove();
  },
});
