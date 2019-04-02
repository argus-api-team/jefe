import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  notify: service('notify'),
  beforeModel() {
    this.transitionTo('index');
    this.get('notify').error('Page does not exist', {
      closeAfter: 3600000, // or set to null to disable auto-hiding
    });
  },
});
