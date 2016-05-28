import Ember from 'ember';
import ApplicationAdapter from './application';

const {
  inject,
  computed
} = Ember;

export default ApplicationAdapter.extend({
  sessionAccount: inject.service('sessionAccount'),
  
  host: 'https://management.azure.com',
  
  headers: computed('session.azureManagement', function() {
    return {
      'Authorization': `Bearer ${this.get('sessionAccount.azureManagement.accessToken')}`
    };
  }),
  
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
  }
});
