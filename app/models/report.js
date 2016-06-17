import Ember from 'ember';
import fetch from 'ember-network/fetch';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import config from '../config/environment';

const {
  computed
} = Ember;

export default Model.extend({
  embedUrl: attr('string'),
  name: attr('string'),
  webUrl: attr('string'),
  
  workspace: belongsTo('workspace'),
  
  tokens: null,
  
  init() {
    this._super();
    this.set('tokens', []);
  },
  
  generateEmbedToken() {
    const createEmbedTokenRequest = {
      url: `${config.powerbi.apiBaseUri}api/generateembedtoken`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        workspaceCollectionName: this.get('workspace.workspaceCollection.id'),
        workspaceId: this.get('workspace.id'),
        reportId: this.get('id'),
        accessKey: this.get('workspace.workspaceCollection.accessKeys.key1')
      })
    };
    
    return fetch(createEmbedTokenRequest.url, createEmbedTokenRequest)
      .then(response => {
        const json = response.json();
        if(response.ok) {
          return json;
        }
        
        throw json;
      });
  },
  
  accessToken: computed(function () {
    let promise;
    
    if(this.get('tokens').length > 0) {
      promise = Ember.Promise.resolve(this.get('tokens').get('lastObject'));
    }
    else {
      promise = this.generateEmbedToken()
        .then(token => {
          this.get('tokens').pushObject(token);
          return token;
        });
    }
      
    const ObjectPromiseProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

    return ObjectPromiseProxy.create({
      promise
    });
  })
});
