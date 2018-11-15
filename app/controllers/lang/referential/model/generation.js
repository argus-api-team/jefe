import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  phaseSorting: Object.freeze(['startDate:desc']),
  sortedPhases: sort('model.phases', 'phaseSorting'),
});
