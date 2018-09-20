import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import { all } from 'rsvp';

export default Component.extend({
  store: service(),

  tagName: 'ul',
  classNames: ['vertical-list'],

  selectedVersion: null,

  candidatesVersionsList: computed('candidates', function () {
    const candidates = this.get('candidates');
    const versionsPromises = this._buildVersionsPromiseArray(candidates);
    return DS.PromiseObject.create({
      promise: all(versionsPromises)
        .then(versions => this._formatVersionCandidateArray(candidates, versions)),
    });
  }),

  candidatesVersionsSorting: Object.freeze(['version.quoteRatio:desc']),

  sortedCandidatesVersionsList: sort('candidatesVersionsList.content', 'candidatesVersionsSorting'),

  aggregatedCandidateQuoteRatio: computed('candidatesVersionsList.content.@each.quoteRatio', function () {
    const candidatesVersionsList = this.get('candidatesVersionsList.content');
    if (candidatesVersionsList) {
      return candidatesVersionsList.reduce(
        (previousValue, item) => previousValue + item.version.get('quoteRatio'),
        0,
        'version.quoteRatio',
      );
    }
    return null;
  }),

  // Private methods
  _buildVersionsPromiseArray(candidates) {
    const store = this.get('store');
    return candidates.map((candidate) => {
      const candidateVersionId = candidate.get('versionId');
      return store.findRecord('version', candidateVersionId, {
        include: 'make,phase,generation,submodel',
        meta: {
          filterable: false,
        },
      });
    });
  },

  _formatVersionCandidateArray(candidates, versions) {
    return candidates.map((candidate) => { // eslint-disable-line
      return {
        candidate,
        version: versions.findBy('id', candidate.get('versionId')),
      };
    });
  },
});
