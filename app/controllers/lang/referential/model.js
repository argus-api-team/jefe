import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import { filter } from 'rsvp';

export default Controller.extend({
  store: service(),


  // Filter Version by Generation
  generationFilterId: '',
  generationFilter: computed('generationFilterId', function () {
    const generationFilterId = this.get('generationFilterId');
    return this._getFilterRecord('generation', generationFilterId);
  }),

  versionFilteredByGeneration:computed('model.versions', 'generationFilter', function () {
    const versions = this.get('model.versions');
    const generation = this.get('generationFilter');
    return this._filterVersionByPeriod(versions, generation);
  }),

  // Filter Version by Phase
  phaseFilterId: '',
  phaseFilter: computed('phaseFilterId' , function () {
    const phaseFilterId = this.get('phaseFilterId');
    return this._getFilterRecord('phase', phaseFilterId);
  }),

  versionFilteredByPhase:computed('versionFilteredByGeneration', 'phaseFilter', function () {
    const phase = this.get('phaseFilter');
    return DS.PromiseObject.create({
      promise: this.get('versionFilteredByGeneration').then((versions) => {
        console.log(versions);
        return this._filterVersionByPeriod(versions, phase);
      }),
    });
    return this._filterVersionByPeriod(versions, phase);
  }),


  filtereVersion:computed('versionFilteredByPhase.content', function() {
    return this.get('versionFilteredByPhase.content');
  }),


  // Internals methods
  _getFilterRecord(recordType, recordId) {
    const store = this.get('store');
    if (recordId) {
      return store.peekRecord(recordType, recordId)
    }
    return null;
  },

  _filterVersionByPeriod(versions, filterCriteriaRecord) {
    const versionsArray = versions.toArray();
    return DS.PromiseObject.create({
      promise: filter(versionsArray, (version) => {
        if (!filterCriteriaRecord) return true;
        return version.get(filterCriteriaRecord.get('constructor.modelName')).then((versionFilteredValue) => {
          return versionFilteredValue === filterCriteriaRecord;
        });
      }),
    });
  },

});
