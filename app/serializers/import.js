import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  normalizeFindHasManyResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { imports: payload.value }, id, requestType];
    return this.normalizeArrayResponse(...args);
  }
});
