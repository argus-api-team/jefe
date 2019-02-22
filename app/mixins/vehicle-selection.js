import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  router: service(),

  selectVersion(version) {
    const valorizationRecord = this.get('valorizationRecord');
    const vehicleDate = this.get('vehicleDate');
    const router = this.get('router');
    valorizationRecord.set('version', version);
    valorizationRecord.set('releasedAt', vehicleDate);
    router.transitionTo('data-set.quote.valorize.offer');
  },
});
