import RESTSerializer from 'ember-data/serializers/rest';
import Ember from 'ember';

export default RESTSerializer.extend({
  primaryKey: 'key1',
  
  normalizeFindBelongsToResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { accessKeys: payload }, id, requestType];
    return this.normalizeSingleResponse(...args);
  },
  
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { accessKeys: payload.value }, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalizeFindHasManyResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { accessKeys: payload.value }, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalize(modelClass, resourceHash) {
    let data = null;

    if (resourceHash) {
      this.normalizeUsingDeclaredMapping(modelClass, resourceHash);
      if (Ember.typeOf(resourceHash.links) === 'object') {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.links);
      }

      data = {
        id:            this.extractId(modelClass, resourceHash),
        type:          modelClass.modelName,
        attributes:    this.extractAttributes(modelClass, resourceHash),
        relationships: this.extractRelationships(modelClass, resourceHash)
      };

      this.applyTransforms(modelClass, data.attributes);
    }

    return { data };
  },
  
  keyForAttribute(key/*, method*/) {
    return key;
  }
});
