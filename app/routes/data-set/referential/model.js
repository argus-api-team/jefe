import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { computed } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('submodel', params.id, {
      include: this.get('includedRelationship'),
      reload: true,
      meta: {
        filterable: false,
      },
    });
  },
  includedRelationship: computed('', function () { // eslint-disable-line
    const includedRelationship = [
      'make',
      'generations.phases',
    ].join(',');
    return includedRelationship;
  }),
});
