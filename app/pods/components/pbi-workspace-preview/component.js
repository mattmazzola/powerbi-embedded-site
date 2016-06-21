import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  workspace: computed.alias('node.value'),

  actions: {
    generateDevToken(workspace, generateTokenAction) {
      generateTokenAction()
        .then(token => {
          workspace.get('tokens').pushObject(token);
        });
    }
  }
});
