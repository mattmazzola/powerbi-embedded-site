import Ember from 'ember';

export default Ember.Component.extend({
  positionalParams: ['node'],

  node: null,

  actions: {
    expand(node) {
      node.set('expanded', !node.get('expanded'));
    },

    singleClicked(node) {
      console.log('singleClicked');
    },

    doubleClicked(node) {
      console.log('doubleclicked');
    }
  }
});
