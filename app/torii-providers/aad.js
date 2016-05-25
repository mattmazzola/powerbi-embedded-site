import Ember from 'ember';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';
import { jwt_decode } from 'ember-cli-jwt-decode';
import { configurable } from 'torii/configuration';

const {
  computed
} = Ember;

export default Oauth2Bearer.extend({
  name:    'aad',
  
  // Set url parameters
  baseUrl: computed(function () {
    return `https://login.windows.net/${this.get('tenantId')}/oauth2/authorize`;
  }),
  tenantId: configurable('tenantId', 'common'),
  responseType: configurable('responseType', 'id_token code'),
  responseMode: configurable('responseMode', 'fragment'),
  nonce: configurable('nonce', 'defaultNonce'),
  scope: configurable('scope', 'openid'),
  display: 'popup',
  
  // Specify extra rquired parameters other than standard OAuth2
  requiredUrlParams: ['display', 'nonce'],
  responseParams: ['code','state'],
  
  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open: function() {
    return this._super()
      .then(function(authData){
        // If the user hit 'cancel' or closed the pop-up throw error
        if (!authData.authorizationToken) {
          throw new Error('User canceled authorization');
        }
        
        const body = JSON.stringify({
          code: authData.authorizationToken.code
        });
        
        return new Ember.RSVP.Promise((resolve, reject) => {
          Ember.$.ajax({
            method: 'POST',
            type: 'POST',
            url: 'http://localhost:1249/api/token',
            headers: {
              'Content-Type': 'application/json'
            },
            processData: false,
            data: body,
            success: Ember.run.bind(null, resolve),
            error: Ember.run.bind(null, reject)
          });
        })
          .then(authData => {
            const graphResource = authData.resources.find(resource => resource.endpointUri === "https://graph.windows.net/");
            const profileUri = `${graphResource.endpointUri}me?api-version=1.6`;
            
            return new Ember.RSVP.Promise((resolve, reject) => {
              Ember.$.ajax({
                method: 'GET',
                type: 'GET',
                url: profileUri,
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${graphResource.accessToken}`
                },
                success: Ember.run.bind(null, resolve),
                error: Ember.run.bind(null, reject)
              });
            })
              .then(userProfile => {
                authData.user = userProfile;
                return authData;
              });
          });
      });
  },

  fetch: function(authData){
    const idToken = jwt_decode(authData.idToken);
    const expirationMilliseconds = parseInt(idToken.exp + "000");
    const currentMilliseconds = (new Date()).getTime();
    const tenMinutesMilliseconds = 600000;

    if((expirationMilliseconds - currentMilliseconds) > tenMinutesMilliseconds) {
      return authData;
    }
  }
});