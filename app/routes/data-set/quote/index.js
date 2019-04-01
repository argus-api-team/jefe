import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  infinity: service(),

  model() {
    return this.get('infinity').model('valorization', {
      perPage: 10,
      startingPage: 1,
      sort: '-id',
      include: 'values',
      perPageParam: 'page.size',
      countParam: 'meta.record-count',
    });
  },
});
