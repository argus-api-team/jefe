import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  i18n: service(),
  classNames: ['dropdown', 'dropdown-extended', 'language-selector'],
  tagName: 'li',
  locale: computed.alias('i18n.locale'),
  locales: computed.alias('i18n.locales'),
});
