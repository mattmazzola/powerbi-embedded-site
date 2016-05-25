import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    login() {
      this.get('session').authenticate('authenticator:torii', 'aad');
    }
  }
});
