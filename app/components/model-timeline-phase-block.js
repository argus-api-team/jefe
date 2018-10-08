import Component from '@ember/component';
import { sort } from '@ember/object/computed';


export default Component.extend({

  classNames: ['m-timeline-1__item'],
  classNameBindings: ['positionClassName'],

  didReceiveAttrs() {
    this.setClassOfPhaseBlock();
    this.setIdOfPhaseBlock();
  },

  setClassOfPhaseBlock() {
    const phase = this.get('phase');
    const sortedModelPhasesArray = this.get('sortedModelPhasesArray');
    let phaseIndex;
    if (sortedModelPhasesArray.length) {
      phaseIndex = sortedModelPhasesArray.indexOf(phase);
    } else {
      phaseIndex = this.get('phaseIndex');
    }
    if (phaseIndex % 2 === 0) {
      this.set('positionClassName', 'm-timeline-1__item--left');
    } else {
      this.set('positionClassName', 'm-timeline-1__item--right');
    }
  },

  setIdOfPhaseBlock() {
    const phaseId = this.get('phase.id');
    const phaseBlockId = `phase-${phaseId}`;
    this.set('elementId', phaseBlockId);
  },

  versionsSorting: Object.freeze(['name:asc']),
  sortedVersions: sort('phase.versions', 'versionsSorting'),
});
