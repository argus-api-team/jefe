import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  session: service(),

  beforeModel() {
    const session = this.get('session');
    if (session.get('isAuthenticated')) {
      this.transitionTo('lang', { lang: this.get('controller.lang') });
    } else {
      this.transitionTo('login');
    }
  },

});
