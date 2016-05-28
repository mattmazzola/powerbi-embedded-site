import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  
  photoUrl: computed('microsoftGraph', function () {
    return `${this.get('microsoftGraph.endpointUri')}v1.0/me/photo/$value`;
  }),
  
  microsoftGraph: computed('session.data.authenticated.resources', function () {
    const resources = this.get('session.data.authenticated.resources');
    return resources.find(resource => resource.endpointUri === "https://graph.microsoft.com/");
  }),
  
  azureGraph: computed('session.data.authenticated.resources', function () {
    const resources = this.get('session.data.authenticated.resources');
    return resources.find(resource => resource.endpointUri === "https://graph.windows.net/");
  }),
  
  azureManagement: computed('session.data.authenticated.resources', function () {
    const resources = this.get('session.data.authenticated.resources');
    return resources.find(resource => resource.endpointUri === "https://management.azure.com/");
  }),
  
  hasPowerBiLicense: computed('session.data.authenticated.user.assignedPlans', function() {
    const assignedPlans = this.get('session.data.authenticated.user.assignedPlans');
    
    const powerBiPlan = assignedPlans.find(plan => plan.service === "PowerBI");
    
    return (powerBiPlan && powerBiPlan.capabilityStatus === "Enabled");
  })
});
