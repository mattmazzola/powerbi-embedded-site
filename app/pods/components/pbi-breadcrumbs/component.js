import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({

  breadcrumbNodes: computed('node', function () {
    let currentNode = this.get('node');
    if(!currentNode) {
      return [];
    }

    const breadcrumbs = [currentNode];

    while(currentNode.get('parent')) {
      breadcrumbs.unshift(currentNode.get('parent'));
      currentNode = currentNode.get('parent');
    }

    return breadcrumbs;
  })
});
