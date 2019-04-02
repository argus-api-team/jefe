import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return RSVP.hash({
      topMakes: this.get('store').query('make', {
        sort: 'position-quote',
        page: { size: 10 },
      }),
      topVehicles: this.get('store').query('version', {
        sort: '-quote-ratio',
        include: 'make,submodel',
        page: { size: 10 },
        filter: {
          quotable: true,
        },
        meta: {
          filterable: false,
        },
      }),
      latestVehicles: this.get('store').query('version', {
        sort: '-id',
        include: 'make,submodel',
        page: { size: 10 },
        meta: {
          filterable: false,
        },
      }),
    }).catch(() => {
      this.transitionTo('data-set.index');
    });
  },
});
