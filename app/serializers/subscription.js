import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  primaryKey: 'subscriptionId',
  
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, { subscriptions: payload.value }, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalize(modelClass, resourceHash) {
    resourceHash.links = {
      resourceGroups: `/subscriptions/${resourceHash.subscriptionId}/resourceGroups?api-version=2016-02-01`
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
