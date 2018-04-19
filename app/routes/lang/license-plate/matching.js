import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('matching', params.id, {
      include: 'registration-card,candidates',
    });
  },
});
