import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  classNames: ['dropdown','dropdown-extended', 'language-selector'],
  tagName: 'li',
  locale: Ember.computed.alias('i18n.locale'),
  locales: Ember.computed.alias('i18n.locales')
});
