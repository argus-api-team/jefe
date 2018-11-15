import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  generationSorting: Object.freeze(['startDate:desc']),
  sortedGenerations: sort('model.generations', 'generationSorting'),
});
