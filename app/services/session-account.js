import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  
  hasPowerBiLicense: Ember.computed('session.data.authenticated.user.assignedPlans', function() {
    const assignedPlans = this.get('session.data.authenticated.user.assignedPlans');
    
    const powerBiPlan = assignedPlans.find(plan => plan.service === "PowerBI");
    
    return (powerBiPlan && powerBiPlan.capabilityStatus === "Enabled");
  })
});
