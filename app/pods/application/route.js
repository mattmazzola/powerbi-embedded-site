import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
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
