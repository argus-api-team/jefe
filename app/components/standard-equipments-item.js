import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: ['standard-equipments-item'],
  classNameBindings: ['focusEquipment:focus'],

  targetId: computed('equipment.id', function() {
    return `target-${this.get('equipment.id')}`;
  }),
  tooltipText: computed('equipment.id', function() {
    return `ID: ${this.get('equipment.id')}`;
  }),

  focusEquipment: false,
  showTrigger: false,

  actions: {
    focusEquipment() {
      this.set('focusEquipment', true);
    },
    blurEquipment() {
      this.set('focusEquipment', false);
    },
  }
});
