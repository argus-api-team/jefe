import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize(snapshot) {
    let json = this._super(...arguments);
    const { record } = snapshot;
    const offer = record.get('offer');
    json = this._cleanDateAttributes(record, offer, json);
    json = this._cleanEffectAttributes(record, offer, json);
    return json;
  },

  _cleanDateAttributes(record, offer, json) {
    const calculatedFor = record.get('calculatedFor');
    if (offer !== 'prevar-value') {
      delete json.data.attributes['returned-at'];
      if (!calculatedFor) {
        delete json.data.attributes['calculated-for'];
      }
    } else {
      delete json.data.attributes['calculated-for'];
    }
    return json;
  },

  _cleanEffectAttributes(record, offer, json) {
    const makes = record.get('makes');
    const geolocalisation = record.get('geolocalisation');
    if (offer !== 'extended-market-value') {
      delete json.data.attributes.makes;
      delete json.data.attributes.geolocalisation;
    } else {
      if (!makes) {
        delete json.data.attributes.makes;
      }
      if (!geolocalisation) {
        delete json.data.attributes.geolocalisation;
      }
    }
    return json;
  },
});
