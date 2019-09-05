import DS from 'ember-data';
import featureModel from './feature';


export default featureModel.extend({
  equipments: DS.hasMany({ async: true }),
});
