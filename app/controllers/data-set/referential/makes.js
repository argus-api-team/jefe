import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['searchTerm'],
  searchTerm: '',

  filteredMakes: computed('searchTerm', 'model.makes', function () {
    const makes = this.get('model.makes');
    const searchTerm = this.get('searchTerm');
    return makes.filter(make =>  make.get('name').toLowerCase().indexOf(searchTerm) > -1);
  }),
});
