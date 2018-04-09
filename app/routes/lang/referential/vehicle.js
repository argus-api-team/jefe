import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('version', params.id, {
      include: 'make,generation,phase,submodel,periods,periods.dimension,periods.tyre,periods.weight,periods.boot,energy,periods.engine,gearbox,periods.transmission,periods.platform,periods.performance,periods.consumption',
    });
  },
});
