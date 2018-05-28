import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';


export default Component.extend({
  i18n: service(),
  locale: computed.alias('i18n.locale'),
  classNames: ['logo-img'],
  noLogoUrl: computed('i18n.locale', function () {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),
  altText: '',

  didRender() {
    this._detectMissingImg();
  },

  didUpdateAttrs() {
    this.$().find('img').addClass('lazyload');
  },

  _detectMissingImg() {
    const context = this;
    this.$().find('img').on('error', function () {
      $(this).addClass('no-logo');
      $(this).attr('src', context.get('noLogoUrl'));
    });
  },
});
