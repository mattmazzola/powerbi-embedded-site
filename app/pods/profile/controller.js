import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Controller.extend({
  session: inject.service('session'),
  sessionAccount: inject.service('session-account')
});
