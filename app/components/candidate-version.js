import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // HTML attrs
  classNames: ['list-item-content'],
  classNameBindings: ['isSelected', 'isSelectable'],

  // Computed Properties
  candidateFrequency: computed('aggregatedCandidateQuoteRatio', 'version.quoteRatio', function () {
    const aggregatedCandidateQuoteRatio = this.get('aggregatedCandidateQuoteRatio');
    const versionQuoteRation = this.get('version.quoteRatio');
    return (versionQuoteRation / aggregatedCandidateQuoteRatio) * 100;
  }),

  candidateFrequencyStyle: computed('candidateFrequency', function () {
    const cadidateFrequency = this.get('candidateFrequency');
    return `height: ${cadidateFrequency}%`;
  }),

  candidateGaugeColor: computed('candidateFrequency', function () {
    const candidateFrequency = this.get('candidateFrequency');
    if (candidateFrequency > 50) {
      return 'm--bg-success';
    } else if (candidateFrequency > 20) {
      return 'm--bg-warning';
    }
    return 'm--bg-danger';
  }),

  isSelected: computed('version', 'selectedVersion', function () {
    const version = this.get('version');
    const selectedVersion = this.get('selectedVersion');
    return version === selectedVersion;
  }),

  // Events
  click() {
    if (this.get('isSelectable')) {
      const version = this.get('version');
      this.set('selectedVersion', version);
    }
  },

});
