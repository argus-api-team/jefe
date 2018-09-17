import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.data.length) {
      payload.data.forEach((element) => {
        element.type = 'features';
      });
    } else {
      payload.data.type = 'features';
    }


    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
