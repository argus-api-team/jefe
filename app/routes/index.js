import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  session: service(),

  beforeModel() {
    const session = this.get('session');
    if (session.get('isAuthenticated')) {
      this.transitionTo('data-set', { data_set: 'fr' });
    } else {
      this.transitionTo('login');
    }
  },

});
