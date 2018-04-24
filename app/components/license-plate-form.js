import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  ably: service(),
  router: service(),

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
  },

  willDestroyElement() {
    const matching = this.get('matching');
    if (!matching.get('isSaving') || matching.get('isValid')) {
      matching.unloadRecord();
      this.set('mathcing', null);
    }
  },

  submit(e) {
    e.preventDefault();
    const router = this.get('router');
    const matching = this.get('matching');
    matching.save().then((matchingRecord) => {
      this.refreshModel();
      if (router.isActive('lang.license-plate')) {
        router.transitionTo('lang.license-plate.matching', matchingRecord.get('id'));
        this._initNewMatchingRecord();
      }
    });
  },
});
