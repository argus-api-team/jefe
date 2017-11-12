import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';


export default Component.extend({
  i18n: service(),
  locale: computed.alias('i18n.locale'),
  noLogoUrl: computed('i18n.locale', function() {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),

  didRender() {
    this._detectMissingImg();
  },

  _detectMissingImg() {
    let context = this;

    $('img').on('error', function() {
      $(this).addClass('no-logo');
      $(this).attr('src', context.get('noLogoUrl'));
    })
  },
});
