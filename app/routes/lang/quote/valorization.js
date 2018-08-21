import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('valorization', params.id, {
      include: 'values',
      reload: true,
    });
  },
  renderTemplate(controller, model) {
    const offer = model.get('offer');
    let template = 'lang.quote.valorization';
    if (offer === 'extended-market-value') {
      template = 'lang.quote.values.extended';
    }
    if (offer === 'custom-market-value') {
      template = 'lang.quote.values.custom';
    }
    if (offer === 'past-market-value') {
      template = 'lang.quote.values.past';
    }
    if (offer === 'past-stock-market-value') {
      template = 'lang.quote.values.past-stock';
    }
    if (offer === 'prevar-value') {
      template = 'lang.quote.values.residual';
    }
    if (offer === 'part-exchange-value') {
      template = 'lang.quote.values.exchange';
    }
    this.render(template);
  },
});
