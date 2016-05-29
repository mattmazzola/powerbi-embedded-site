import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  subscriptions: null,
  resourceGroups: null,
  selectedSubscription: null,
  selectedResourceGroup: null,
  selectedWorkspaceCollection: null,
  selectedWorkspace: null,
  
  workspaceCollectionName: null,
  
  actions: {
    loadSubscriptions() {
      this.set('subscriptions', this.store.findAll('subscription'));
    },
    
    loadResourceGroups() {
      const resourceGroups = this.get('selectedSubscription').get('resourceGroups');
      
      console.log(resourceGroups);
      
      // this.set('resourceGroups', this.store.query('resourceGroup', { subscription: this.get('selectedSubscription') }));
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
    }
  }
});
