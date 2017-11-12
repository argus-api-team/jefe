import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
  model(params) {
    return this.store.findRecord('make', params.id, {
      include: 'models'
    })
  }
});
