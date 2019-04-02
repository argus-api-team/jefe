import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return RSVP.hash({
      makes: this.store.query('make', {
        page: { size: 500 },
        sort: 'name',
        include: 'categories',
      }),
      categories: this.store.query('category', {
        page: { size: 20 },
        sort: 'name',
      }),
    }).catch(() => {
      this.transitionTo('index');
    });
  },
});
