import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  inApp: computed('currentPath', function () {
    return this.get('currentPath').indexOf('lang') === 0;
  }),
});
