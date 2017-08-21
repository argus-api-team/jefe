import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.data.forEach(function(element) {
      element.type = 'features'
    });

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
