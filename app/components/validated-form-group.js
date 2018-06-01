import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: ['form-group', 'm-form__group', 'row'],
  classNameBindings: ['onError:has-danger'],

  onError: computed('isValid', 'showErrorMessage', function () {
    const showErrorMessage = this.get('showErrorMessage') || this.get('forceShowErrorMessage');
    return !this.get('isValid') && showErrorMessage;
  }),
  showErrorMessage: false,

  focusOut() {
    this.set('showErrorMessage', true);
  },
});
