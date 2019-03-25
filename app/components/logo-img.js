import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import lozad from 'lozad';

const lozadObserver = lozad();

export default Component.extend({
  intl: service(),
  locale: computed.alias('intl.locale'),
  classNames: ['lozad'],
  tagName: 'img',
  attributeBindings: ['src', 'data-src', 'alt', 'title'],

  noLogoUrl: computed('intl.locale', function () {
    return `/assets/logos/no_logo_${this.get('locale')}.png`;
  }),

  altText: '',
  src: '/assets/loader64.svg',

  didInsertElement() {
    this.get('element').addEventListener('error', () => {
      if (!this.get('isDestroyed')) {
        this.set('src', this.get('noLogoUrl'));
      }
    });
  },

  didRender() {
    lozadObserver.observe(this.get('element'));
  },

  willDestroyElement() {
    this.get('element').removeEventListener('error', () => {});
  },
});
