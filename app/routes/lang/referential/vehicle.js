import Route from '@ember/routing/route';
import RSVP from 'rsvp';


export default Route.extend({
  model(params) {
    return RSVP.hash({
      vehicle: this.store.findRecord('version', params.id, {
        include: 'make,generation,phase,submodel,periods,periods.dimension,periods.tyre,periods.weight,periods.boot,energy,periods.engine,gearbox,periods.transmission,periods.platform,periods.performance,periods.consumption,periods.standard-equipments.feature-category,periods.optional-equipments.feature-category',
        reload: true,
      }),
      featureCategories: this.store.findAll('featureCategory'),
    });
  },
});
