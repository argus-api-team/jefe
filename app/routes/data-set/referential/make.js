import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  notify: service('notify'),

  model(params) {
    return RSVP.hash({
      make: this.get('store').findRecord('make', params.id, {
        include: 'models.categories,models.submodels,categories,submodels.category',
        reload: true,
      }),
      topMakeVehicles: this.get('store').query('version', {
        sort: '-quote-ratio',
        include: 'make,submodel',
        page: { size: 5 },
        filter: { // Need API update
          quotable: true,
          'make.id': params.id,
        },
        meta: {
          filterable: false,
        },
      }),
      latestMakeVehicles: this.get('store').query('version', {
        sort: '-id',
        include: 'make,submodel',
        page: { size: 5 },
        meta: {
          filterable: false,
        },
        filter: { // Need API update
          'make.id': params.id,
        },
      }),
    }).catch(() => {
      this.transitionTo('data-set.makes');
    });
  },
});
