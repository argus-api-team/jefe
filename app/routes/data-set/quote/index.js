import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
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
