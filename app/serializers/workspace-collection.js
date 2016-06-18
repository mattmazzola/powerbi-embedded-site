import RESTSerializer from 'ember-data/serializers/rest';
import Ember from 'ember';

export default RESTSerializer.extend({
  primaryKey: 'name',
  
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { workspaceCollections: payload.value }, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalizeFindHasManyResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { workspaceCollections: payload.value }, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalize(modelClass, resourceHash) {
    Object.keys(resourceHash.properties)
      .forEach(key => {
        resourceHash[key] = resourceHash.properties[key];
      });
      
    Object.keys(resourceHash.sku)
      .forEach(key => {
        resourceHash[`sku${key}`] = resourceHash.sku[key];
      });
      
    resourceHash.links = {
      workspaces: `${resourceHash.id}/workspaces?api-version=2016-01-29`,
      accessKeys: `${resourceHash.id}/listKeys?api-version=2016-01-29`
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
  
  keyForAttribute(key/*, method*/) {
    return key;
  }
});
