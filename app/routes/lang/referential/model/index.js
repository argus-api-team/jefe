import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    const model = this.modelFor('lang.referential.model');
    return model.get('generations').then((generations) => {
      const sortedGenerations = generations.sortBy('startDate');
      const lastGeneration = sortedGenerations.lastObject;
      this.transitionTo('lang.referential.model.generation', lastGeneration.get('id'));
    });
  },
});
