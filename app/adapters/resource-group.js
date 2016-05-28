import Ember from 'ember';
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
  
  urlForQuery(query, modelName, id) {
    var url = [];
    var host = Ember.get(this, 'host');
    var prefix = this.urlPrefix();
    var path;

    url.push(query.subscription.get('id'));
    query.subscription = null;
    delete query.subscription;
    
    if (modelName) {
      const camelized = Ember.String.camelize(modelName);
      path = Ember.String.pluralize(camelized);
      if (path) {
        url.push(path);
      }
    }

    if (id) {
      url.push(encodeURIComponent(id));
    }
    if (prefix) {
      url.unshift(prefix);
    }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  }
});
