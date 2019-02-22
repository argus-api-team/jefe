import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    const generation = this.modelFor('data-set.referential.model.generation');
    return generation.get('phases').then((phases) => {
      const sortedPhases = phases.sortBy('startDate');
      const lastPhase = sortedPhases.lastObject;
      this.transitionTo('data-set.referential.model.generation.phase', lastPhase.get('id'));
    });
  },
});
