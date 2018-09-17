import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize(snapshot) {
    const jsonToClean = this._super(...arguments);
    const { record } = snapshot;

    if (record.get('isExtended')) {
      return this._cleanExtendedAttributes(record, jsonToClean);
    }
    if (record.get('isPrevar')) {
      return this._cleanPrevarAttributes(jsonToClean);
    }
    return this._cleanAttributes(record, jsonToClean);
  },

  _cleanExtendedAttributes(record, json) {
    delete json.data.attributes['calculated-for'];
    delete json.data.attributes['returned-at'];
    if (!record.get('makes')) {
      delete json.data.attributes.makes;
    }
    if (!record.get('geolocalisation')) {
      delete json.data.attributes.geolocalisation;
    }
    return json;
  },

  _cleanPrevarAttributes(json) {
    delete json.data.attributes['calculated-for'];
    return this._cleanEffectAttributes(json);
  },

  _cleanAttributes(record, json) {
    delete json.data.attributes['returned-at'];
    if (!record.get('calculatedFor')) {
      delete json.data.attributes['calculated-for'];
    }
    return this._cleanEffectAttributes(json);
  },

  _cleanEffectAttributes(json) {
    delete json.data.attributes.makes;
    delete json.data.attributes.geolocalisation;
    return json;
  },

});
