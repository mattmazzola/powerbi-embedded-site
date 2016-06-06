import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  subscriptions: null,
  resourceGroups: null,
  selectedSubscription: null,
  selectedResourceGroup: null,
  selectedWorkspaceCollection: null,
  selectedWorkspace: null,
  selectedImport: null,
  selectedReport: null,
  selectedDataset: null,
  
  workspaceCollectionName: null,
  
  provisionTokens: null,
  
  embedConfig: computed('selectedReport', function () {
    return {
      type: 'report',
      embedUrl: this.get('selectedReport.embedUrl'),
      accessToken: this.get('selectedReport.accessToken')
    };
  }),
  
  init() {
    this._super();
    this.set('provisionTokens', []);
  },
  
  actions: {
    generateDevToken(workspace, generateTokenAction) {
      generateTokenAction()
        .then(token => {
          workspace.get('tokens').pushObject(token);
        });
    },
    
    generateProvisionToken(workspaceCollection, generateTokenAction) {
      generateTokenAction()
        .then(token => {
          workspaceCollection.get('tokens').pushObject(token);
        });
    },
    
    loadSubscriptions() {
      this.set('subscriptions', this.store.findAll('subscription'));
    },
    
    selectSubscription(subscription) {
      this.set('selectedSubscription', subscription);
    },
    
    selectResourceGroup(resourceGroup) {
      this.set('selectedResourceGroup', resourceGroup);
    },
    
    selectWorkspaceCollection(workspaceCollection) {
      this.set('selectedWorkspaceCollection', workspaceCollection);
    },
    
    selectWorkspace(workspace) {
      this.set('selectedWorkspace', workspace);
    },
    
    selectReport(report) {
      this.set('selectedReport', report);
    },
    
    selectImport(anImport) {
      this.set('selectedImport', anImport);
    },
    
    selectDataset(dataset) {
      this.set('selectedDataset', dataset);
    }
  }
});
