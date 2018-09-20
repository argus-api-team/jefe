import Component from '@ember/component';
import { computed } from '@ember/object';
import ArrayProxy from '@ember/array/proxy';

export default Component.extend({
  classNames: ['m-timeline-1', 'model-timeline'],
  phaseIndex: 0,

  sortingModelPhasesArray: Object.freeze(['startDate:desc']),
  modelPhasesArray: ArrayProxy.create({ content: [] }),

  sortedModelPhasesArray: computed.sort('modelPhasesArray', 'sortingModelPhasesArray'),

  didReceiveAttrs() {
    this.getAllPhaseOfModel();
  },

  getAllPhaseOfModel() {
    const model = this.get('model');
    model.get('generations').then((generations) => {
      generations.forEach((generation) => {
        generation.get('phases').then((phases) => {
          phases.forEach((phase) => {
            this.get('modelPhasesArray').pushObject(phase);
          });
        });
      });
    });
  },

});
