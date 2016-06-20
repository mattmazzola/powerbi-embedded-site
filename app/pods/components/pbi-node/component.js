import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  positionalParams: ['node'],
  classNames: ['pbi-node'],
  classNameBindings: ['isSelected:pbi-node--selected'],

  isSelected: computed('selectedNode', function () {
    const nodeId = `${this.get('node.type')}${this.get('node.value.id')}`;
    const selectedNodeId = `${this.get('node.type')}${this.get('selectedNode.value.id')}`;
    const isSelected = nodeId === selectedNodeId;
    if(isSelected) {
      console.log(`nodeId: `, nodeId, ` selectedNodeId: `, selectedNodeId);
    }
    return isSelected;
  }),

  node: null,

  actions: {
    expand(node) {
      node.set('expanded', !node.get('expanded'));
    },

    singleClicked(node) {
      console.log('singleClicked');
      this.get('onSingleClick')(node);
    },

    doubleClicked(node) {
      console.log('doubleclicked');
      node.set('expanded', !node.get('expanded'));
    }
  }
});
