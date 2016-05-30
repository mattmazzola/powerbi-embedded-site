import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import fetch from "ember-network/fetch";

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    login() {
      this.get('session').authenticate('authenticator:torii', 'aad');
    },
    createWorkspaceCollection(data) {
      const workspaceCollection = {
        location: "southcentralus",
        sku: {
          name: "S1",
          tier: "Standard"
        },
        tags: {
          createdBy: 'PowerBiEmbeddedSite'
        }
      };
      
      const request = {
        url: `${this.get('sessionAccount.azureManagement.endpointUri')}subscriptions/${data.subscription.get('id')}/resourceGroups/${data.resourceGroup.get('id')}/providers/Microsoft.PowerBI/workspaceCollections/${data.name}?api-version=2016-01-29`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.get('sessionAccount.azureManagement.accessToken')}`
        },
        body: JSON.stringify(workspaceCollection)
      };
      
      console.log('workspaceCollection: ', request);
      
      return fetch(request.url, request)
        .then(response => response.json())
        .then(newWorkspaceCollection => {
          console.log('newWorkspaceCollection: ', newWorkspaceCollection);
          
          this.store.pushPayload('workspaceCollection', {
            workspaceCollections: [
              newWorkspaceCollection
            ]
          });
          
          const id = newWorkspaceCollection.name;
          const newWorkspaceCollectionModel = this.store.peekRecord('workspaceCollection', id);
          newWorkspaceCollectionModel.set('resourceGroup', data.resourceGroup);
          data.resourceGroup.get('workspaceCollections').pushObject(newWorkspaceCollectionModel);
        });
    }
  }
});
