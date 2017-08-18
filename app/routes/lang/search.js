import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
  classNames: ['page-container-bg-solid'],
  perPageParam: 'page[size]',
  pageParam: 'page[number]',
  totalPagesParam: "meta.record-count",

  model() {
    return this.store.query('make', {
      page: { size: 500 }
    })
  }
});
