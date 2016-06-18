import SubscriptionAdapter from './subscription';

export default SubscriptionAdapter.extend({
  namespace: 'subscriptions',
  
  buildURL(modelName, id, snapshot, requestType, query) {
    let url;
    
    switch (requestType) {
      case 'findRecord':
        url = this.urlForFindRecord(id, modelName, snapshot);
        break;
      case 'findAll':
        url = this.urlForFindAll(modelName, snapshot);
        break;
      case 'query':
        url = this.urlForQuery(query, modelName);
        break;
      case 'queryRecord':
        url = this.urlForQueryRecord(query, modelName);
        break;
      case 'findMany':
        url = this.urlForFindMany(id, modelName, snapshot);
        break;
      case 'findHasMany':
        url = this.urlForFindHasMany(id, modelName, snapshot);
        break;
      case 'findBelongsTo':
        url = this.urlForFindBelongsTo(id, modelName, snapshot);
        break;
      case 'createRecord':
        url = this.urlForCreateRecord(modelName, snapshot);
        break;
      case 'updateRecord':
        url = this.urlForUpdateRecord(id, modelName, snapshot);
        break;
      case 'deleteRecord':
        url = this.urlForDeleteRecord(id, modelName, snapshot);
        break;
      default:
        url = this._buildURL(modelName, id);
        break;
    }
    
    url += `?api-version=2016-01-29`;
    
    return url;
  },
  
  findBelongsTo(store, snapshot, url/*, relationship */) {
    var id   = snapshot.id;
    var type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findBelongsTo'));
    return this.ajax(url, 'POST');
  }
});
