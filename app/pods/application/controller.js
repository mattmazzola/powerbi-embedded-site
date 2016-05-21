import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    login() {
      this.get('session').authenticate('authenticator:torii', 'aad');
    }
  }
});