import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.peekRecord('generation', params.generation_id).catch(() => {
      this.transitionTo('index');
    });
  },
  renderTemplate(controller, model) {
    this.render('data-set.referential.model.generation', {
      into: 'data-set.referential.model',
      outlet: 'phases',
      model,
    });
  },
});
