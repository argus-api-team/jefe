import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    const oid = controller.get('oid');
    if (oid) {
      controller.set('highlightOidForm', true);
    }
  },
  resetOidParam: on('deactivate', function () {
    this.controller.set('oid', null);
    this.controller.set('highlightOidForm', false);
  }),
});
