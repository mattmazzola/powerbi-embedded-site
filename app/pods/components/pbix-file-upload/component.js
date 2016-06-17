import Ember from 'ember';
import fetch from 'ember-network/fetch';
import config from '../../../config/environment';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  sessionAccount: inject.service('session-account'),
  workspaceCollection: null,
  workspace: null,
  
  actions: {
    onInitOfUploader(data) {
      console.log(`upload pbix#onInitOfUploader:`, data);
    },
    
    uploadPbix(pbixFile) {
      console.log(`upload pbix:`);
      console.log(`workspaceCollectionName:`, this.get('workspaceCollection.id'));
      console.log(`accessKey:`, this.get('workspaceCollection.accessKeys.key1'));
      console.log(`workspace:`, this.get('workspace.id'));
      console.log(`pbixFile:`, pbixFile);
      
      const createDevTokenRequest = {
        url: `${config.powerbi.apiBaseUri}api/generatedevtoken`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          workspaceCollectionName: this.get('workspaceCollection.id'),
          workspaceId: this.get('workspace.id'),
          accessKey: this.get('workspaceCollection.accessKeys.key1')
        })
      };
      
      return fetch(createDevTokenRequest.url, createDevTokenRequest)
        .then(response => {
          if(response.ok) {
            response.json()
              .then(devToken => {
                const displayName = `DataSetName_${Math.random().toString(35).substring(2,15)}`;
                const uploadReportRequest = {
                  url: `${this.get('sessionAccount.powerbi.endpointUri')}/beta/collections/${this.get('workspaceCollection.id')}/workspaces/${this.get('workspace.id')}/imports?datasetDisplayName=${displayName}`,
                  method: 'post',
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': `AppToken ${devToken}`
                  }
                };
                
                return pbixFile.upload(uploadReportRequest.url, { headers: uploadReportRequest.headers })
                  .then(response => {
                    console.log(`newImport: `, response);
                    
                    // TODO: Fetch import and related dataset / report and add those models.
                    const importId = response.body.id;
                    
                    // this.store.pushPayload('workspace', {
                    //   workspaces: [
                    //     newWorkspace
                    //   ]
                    // });
                    
                    // const id = newWorkspace.workspaceId;
                    // const newWorkspaceModel = this.store.peekRecord('workspace', id);
                    // newWorkspaceModel.set('workspaceCollection', data.workspaceCollection);
                    // data.workspaceCollection.get('workspaces').pushObject(newWorkspaceModel);
                  });
              });
          }
        });
    },
    
    uploadError(error) {
      throw error;
    }
  }
});
