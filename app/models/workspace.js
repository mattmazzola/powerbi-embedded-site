import Ember from 'ember';
import fetch from 'ember-network/fetch';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import config from '../config/environment';

const {
  computed
} = Ember;

export default Model.extend({
  name: attr('string'),
  
  reports: hasMany('report'),
  datasets: hasMany('dataset'),
  gateways: hasMany('gateways'),
  imports: hasMany('imports'),
  workspaceCollection: belongsTo('workspaceCollection'),
  
  tokens: null,
  
  init() {
    this._super();
    this.set('tokens', []);
  },
  
  generateDevToken() {
    const createDevTokenRequest = {
      url: `${config.powerbi.apiBaseUri}api/generatedevtoken`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        workspaceCollectionName: this.get('workspaceCollection.id'),
        workspaceId: this.get('id'),
        accessKey: this.get('workspaceCollection.accessKeys.key1')
      })
    };
    
    return fetch(createDevTokenRequest.url, createDevTokenRequest)
      .then(response => {
        const json = response.json();
        if(response.ok) {
          return json;
        }
        else {
          throw json;
        }
      });
  },
  
  token: computed('tokens', function () {
    // if(this.get('tokens').length > 0) {
    //   return Ember.RSVP.Promise.resolve(this.get('tokens').get('lastObject'));
    // }
    
    return this.generateDevToken()
      .then(token => {
        this.get('tokens').pushObject(token);
        return token;
      });
  })
});
