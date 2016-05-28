import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    switch (requestType) {
      case 'findRecord':
        return this.normalizeFindRecordResponse(...arguments);
      case 'queryRecord':
        return this.normalizeQueryRecordResponse(...arguments);
      case 'findAll':
        return this.normalizeFindAllResponse(...arguments);
      case 'findBelongsTo':
        return this.normalizeFindBelongsToResponse(...arguments);
      case 'findHasMany':
        return this.normalizeFindHasManyResponse(...arguments);
      case 'findMany':
        return this.normalizeFindManyResponse(...arguments);
      case 'query':
        return this.normalizeQueryResponse(...arguments);
      case 'createRecord':
        return this.normalizeCreateRecordResponse(...arguments);
      case 'deleteRecord':
        return this.normalizeDeleteRecordResponse(...arguments);
      case 'updateRecord':
        return this.normalizeUpdateRecordResponse(...arguments);
    }
  },
  
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    const args = [store, primaryModelClass, payload.value, id, requestType];
    return this.normalizeArrayResponse(...args);
  },
  
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const data = payload
      .map(subscription => {
        return {
          type: 'subscription',
          id: subscription.subscriptionId,
          attributes: subscription,
          relationships: {
            'resource-groups': {
              links: {
                self: `/subscriptions/${subscription.subscriptionId}/resourceGroups`
              }
            }
          }
        };
      });
      
    return this._normalizeResponse(store, primaryModelClass, { data }, id, requestType, false);
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
  
  keyForAttribute: function keyForAttribute(key, method) {
    return key;
  }
  
});
