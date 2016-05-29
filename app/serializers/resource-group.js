import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  primaryKey: 'name',
    
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, payload.value, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalizeFindHasManyResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, payload.value, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalize(modelClass, resourceHash) {
    resourceHash.provisioningState = resourceHash.properties.provisioningState;
    resourceHash.links = {
      workspaceCollections: `${resourceHash.id}/providers/Microsoft.PowerBI/workspaceCollections?api-version=2016-01-29`
    };
    
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
  
  keyForAttribute(key, method) {
    return key;
  }
});
