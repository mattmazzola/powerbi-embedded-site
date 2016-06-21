import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  workspaceCollection: computed.alias('node.value'),

  actions: {
    generateProvisionToken(workspaceCollection, generateTokenAction) {
      generateTokenAction()
        .then(token => {
          workspaceCollection.get('tokens').pushObject(token);
        });
    }
  }
});
