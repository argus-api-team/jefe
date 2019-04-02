import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  notify: service('notify'),
  beforeModel() {
    this.transitionTo('index');
    this.get('notify').alert('Page does not exist', {
      type: 'warning',
      icon: 'warning',
      title: 'Error 404',
    });
  },
});
