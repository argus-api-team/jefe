import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    const model = this.modelFor('data-set.referential.model');
    return model.get('generations').then((generations) => {
      const sortedGenerations = generations.sortBy('startDate');
      const lastGeneration = sortedGenerations.lastObject;
      this.transitionTo('data-set.referential.model.generation', lastGeneration.get('id'));
    });
  },
});
