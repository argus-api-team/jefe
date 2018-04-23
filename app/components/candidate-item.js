import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  tagName: 'li',
  classNames: ['vertical-list__item'],
  candidate: null,
  didReceiveAttrs() {
    const candidateVersionId = this.get('candidate.versionId');
    const store = this.get('store');
    store.findRecord('version', candidateVersionId, {
      include: 'make,submodel',
      reload: true,
    }).then((versionRecord) => {
      this.set('candidateVersion', versionRecord);
    });
  },
});
