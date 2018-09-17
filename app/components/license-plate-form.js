import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({

  store: service(),
  ably: service(),
  router: service(),

  showErrorMessage: false,

  tagName: 'form',
  classNames: ['license-plate-form'],

  init() {
    this._super(...arguments);
    this.get('ably');
    this._initNewMatchingRecord();
  },

  _initNewMatchingRecord() {
    const store = this.get('store');
    const matching = store.createRecord(
      'matching',
      {
        offer: 'identification-by-registration',
      },
    );
    this.set('matching', matching);
    this.set('showErrorMessage', false);
  },

  willDestroyElement() {
    const matching = this.get('matching');
    if (!matching.get('isSaving') || matching.get('isValid')) {
      matching.unloadRecord();
      this.set('mathcing', null);
    }
  },

  keyPress(e) {
    if (e.originalEvent.keyCode === 13) {
      this.set('showErrorMessage', true);
    }
  },

  submit(e) {
    e.preventDefault();
    const router = this.get('router');
    const matching = this.get('matching');
    if (matching.get('isSaving')) {
      return false;
    }
    this.$().find('input').blur();
    return matching.save().then((matchingRecord) => {
      matching.set('isSearching', true);
      this.set('resolvedMatchingRecord', matchingRecord);
      this._initNewMatchingRecord();
      if (router.isActive('lang.license-plate')) {
        this.refreshModel();
        router.transitionTo('lang.license-plate.matching', matchingRecord.get('id'));
      }
    });
  },
});
