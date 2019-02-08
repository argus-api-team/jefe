import Route from '@ember/routing/route';


export default Route.extend({
  model(params) {
    return this.store.peekRecord('generation', params.generation_id);
  },
  renderTemplate(controller, model) {
    this.render('data-set.referential.model.generation', {
      into: 'data-set.referential.model',
      outlet: 'phases',
      model,
    });
  },
});
