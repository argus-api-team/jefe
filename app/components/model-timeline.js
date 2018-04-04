import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['m-timeline-1', 'model-timeline'],
  phaseIndex: 0,

  init() {
    this._super(...arguments);
    this.set('modelPhasesArray', []);
    this.set('sortingModelPhasesArray', ['startDate:desc']);
  },

  didReceiveAttrs() {
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

  sortedModelPhasesArray: computed.sort('modelPhasesArray', 'sortingModelPhasesArray'),
});
