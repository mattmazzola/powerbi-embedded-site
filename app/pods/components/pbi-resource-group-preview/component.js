import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  workspaceCollectionName: null,

  resourceGroup: computed.alias('node.value')
});
