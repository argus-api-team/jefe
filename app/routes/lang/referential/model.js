import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('submodel', params.id, {
      include: 'make,generations.phases.versions',
    });
  },
});
