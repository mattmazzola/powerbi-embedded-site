import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  positionalParams: ['node'],
  classNames: ['pbi-node'],
  classNameBindings: ['isSelected:pbi-node--selected'],

  isSelected: computed('selectedNode', function () {
    return `${this.get('node.type')}${this.get('node.value.id')}` === `${this.get('node.type')}${this.get('selectedNode.value.id')}`;
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
