import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
  templateName: '/login',
  perPageParam: 'page[size]',
  pageParam: 'page[number]',
  totalPagesParam: "meta.record-count",

  model() {
    return this.infinityModel('make', {
      perPage: 20,
      startingPage: 1,
      sort: 'name',
      'links': false
    })
  }
});
