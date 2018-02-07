import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let makeId = this.modelFor('lang.showroom.make').get('id');
    return this.store.findRecord('make', makeId, {
      include: 'submodels,models'
    });
  }
  // Improve https://api.largus.fr/specs/2.0/makes/:makeId/models EndPoint for user this lighter method:
  // model(params) {
  //   let make = this.modelFor('lang.showroom.make');
  //   return make.get('models');
  // }
});
