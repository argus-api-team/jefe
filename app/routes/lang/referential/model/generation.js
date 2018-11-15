import Route from '@ember/routing/route';


export default Route.extend({
  model(params) {
    return this.store.peekRecord('generation', params.generation_id);
  },
  renderTemplate(controller, model) {
    this.render('lang.referential.model.generation', {
      into: 'lang.referential.model',
      outlet: 'phases',
      model,
    });
  },
});
