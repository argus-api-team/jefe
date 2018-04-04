import Component from '@ember/component';


export default Component.extend({

  classNames: ['m-timeline-1__item'],
  classNameBindings: ['positionClassName'],

  didReceiveAttrs() {
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
});
