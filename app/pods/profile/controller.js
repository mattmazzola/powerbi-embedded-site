import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  session: Ember.inject.service('session')
});
