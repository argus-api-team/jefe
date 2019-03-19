import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import lozad from 'lozad';
import $ from 'jquery';


const lozadObserver = lozad();

export default Component.extend({
  intl: service(),
  locale: computed.alias('intl.locale'),
  classNames: ['logo-img'],
  noLogoUrl: computed('intl.locale', function () {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),
  altText: '',

  didRender() {
    lozadObserver.observe(this);
    this._detectMissingImg();
  },

  _detectMissingImg() {
    const context = this;
    this.$().find('img').on('error', function () {
      $(this).addClass('no-logo');
      $(this).removeClass('lozad');
      $(this).attr('src', context.get('noLogoUrl'));
      lozadObserver.observe(context);
    });
  },

});
