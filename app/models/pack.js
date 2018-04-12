import DS from 'ember-data';
import FeatureModelMixin from '../mixins/feature-model';

export default DS.Model.extend(FeatureModelMixin, {
  equipments: DS.hasMany({ async: true }),
});
