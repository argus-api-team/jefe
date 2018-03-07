import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isLogin: computed('currentPath', function () {
    return this.get('currentPath') === 'lang.login';
  }),
});
