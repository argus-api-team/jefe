import Component from '@ember/component';
import c3 from 'c3';

export default Component.extend({
  didInsertElement() {
    const componentId = `#${this.get('elementId')}`;
    c3.generate({
      bindto: componentId,
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25],
        ],
      },
    });
  },
});
