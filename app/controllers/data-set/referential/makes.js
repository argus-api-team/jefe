import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  queryParams: ['searchTerm'],
  searchTerm: '',

  seachObserver: observer('searchTerm', 'model.makes', function () { // eslint-disable-line
    debounce(this, this.filterMakes, 500);
  }),

  filterMakes() {
    const makes = this.get('model.makes');
    const searchTerm = this.get('searchTerm');
    const filteredMakes = makes.filter(make => make.get('name').toLowerCase().indexOf(searchTerm) > -1);
    this.set('filteredMakes', filteredMakes);
  },

});
