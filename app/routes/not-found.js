import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  notify: service('notify'),
  intl: service('intl'),
  beforeModel() {
    const intl = this.get('intl');
    this.transitionTo('index');
    this.get('notify').alert(intl.t('notifications.errors.notFound.text'), {
      type: 'warning',
      icon: 'warning',
      title: intl.t('notifications.errors.notFound.title'),
    });
  },
});
