import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let make = this.modelFor('lang.showroom.make');
    return make.get('models');
  }
});
