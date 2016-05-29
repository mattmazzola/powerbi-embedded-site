import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  primaryKey: 'workspaceId',
  
  normalizeFindHasManyResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, payload.value, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalize(modelClass, resourceHash) {
    Object.keys(resourceHash.properties)
      .forEach(key => {
        resourceHash[key] = resourceHash.properties[key];
      });
      
    // resourceHash.links = {
    //   workspaces: `${resourceHash.id}/workspaces?api-version=2016-02-01`
    // };
    
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
