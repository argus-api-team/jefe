import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  media: service(),
  largeMode: computed('media.isJumbo', function () {
    return this.get('media.isJumbo');
  }),
});
