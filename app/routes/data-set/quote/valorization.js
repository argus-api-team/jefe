import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('valorization', params.id, {
      include: 'values',
      reload: true,
    });
  },
  renderTemplate(controller, model) {
    const offer = model.get('offer');
    let template = 'data-set.quote.valorization';
    if (offer === 'extended-market-value') {
      template = 'data-set.quote.values.extended';
    }
    if (offer === 'custom-market-value') {
      template = 'data-set.quote.values.custom';
    }
    if (offer === 'past-market-value') {
      template = 'data-set.quote.values.past';
    }
    if (offer === 'past-stock-market-value') {
      template = 'data-set.quote.values.past-stock';
    }
    if (offer === 'prevar-value') {
      template = 'data-set.quote.values.residual';
    }
    if (offer === 'part-exchange-value') {
      template = 'data-set.quote.values.exchange';
    }
    this.render(template);
  },
});
