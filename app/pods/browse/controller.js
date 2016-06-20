import Ember from 'ember';

const {
  computed
} = Ember;

const Node = Ember.Object.extend({
  type: 'unknown',
  value: null,
  expandable: true,
  expanded: false,
  nodes: null
});

const ReportNode = Node.extend({
  type: 'report',
  expandable: false
});

const ReportsNode = Node.extend({
  type: 'reports',
  name: 'Reports',
  nodes: computed('value.reports.@each', function () {
    if(Ember.isEmpty(this.get('value.reports'))) {
      return null;
    }

    return this.get('value.reports').map(report => {
      return ReportNode.create({
        value: report,
        name: report.get('name')
      });
    });
  })
});

const DatasetNode = Node.extend({
  type: 'dataset'
});

const DatasetsNode = Node.extend({
  type: 'datasets',
  name: 'Datasets',
  nodes: computed('value.datasets.@each', function () {
    if(Ember.isEmpty(this.get('value.datasets'))) {
      return null;
    }

    return this.get('value.datasets').map(dataset => {
      return DatasetNode.create({
        value: dataset,
        name: dataset.get('name')
      });
    });
  })
});

const ImportNode = Node.extend({
  type: 'import',
  expandable: false
});

const ImportsNode = Node.extend({
  type: 'imports',
  name: 'Imports',
  nodes: computed('value.imports.@each', function () {
    if(Ember.isEmpty(this.get('value.imports'))) {
      return null;
    }

    return this.get('value.imports').map(xImport => {
      return ImportNode.create({
        value: xImport,
        name: xImport.get('name')
      });
    });
  })
});

const WorkspaceNode = Node.extend({
  type: 'workspace',

  init() {
    this._super.apply();

    const nodes = [
      ReportsNode.create({
        value: this.get('value')
      }),
      ImportsNode.create({
        value: this.get('value')
      }),
      DatasetsNode.create({
        value: this.get('value')
      })
    ];

    this.set('nodes', nodes);
  }
});

const WorkspaceCollectionNode = Node.extend({
  type: 'workspaceCollection',

  nodes: computed('value.workspaces.@each', function () {
    if(Ember.isEmpty(this.get('value.workspaces'))) {
      return null;
    }

    return this.get('value.workspaces').map(workspace => {
      return WorkspaceNode.create({
        type: 'workspace',
        value: workspace,
        name: workspace.get('id')
      });
    });
  })
});

const ResourceGroupNode = Node.extend({
  type: 'resourceGroup',

  nodes: computed('value.workspaceCollections.@each', function () {
    if(Ember.isEmpty(this.get('value.workspaceCollections'))) {
      return null;
    }

    return this.get('value.workspaceCollections').map(workspaceCollection => {
      return WorkspaceCollectionNode.create({
        type: 'workspaceCollection',
        value: workspaceCollection,
        name: workspaceCollection.get('id')
      });
    });
  })
});

const SubscriptionNode = Node.extend({
  type: 'subscription',

  nodes: computed('value.resourceGroups.@each', function () {
    if(Ember.isEmpty(this.get('value.resourceGroups'))) {
      return null;
    }

    return this.get('value.resourceGroups').map(resourceGroup => {
      return ResourceGroupNode.create({
        value: resourceGroup,
        name: resourceGroup.get('id')
      });
    });
  })
});

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),

  selectedNode: null,
  selectedItem: null,
  subscriptions: null,
  subscriptionNodes: computed('subscriptions.@each', function () {
    if(Ember.isEmpty(this.get('subscriptions'))) {
      return null;
    }

    return this.get('subscriptions').map(subscription => {
      return SubscriptionNode.create({
        value: subscription,
        name: subscription.get('displayName')
      });
    });
  }),

  actions: {
    loadSubscriptions() {
      this.set('subscriptions', this.store.findAll('subscription'));
    },

    selectNode(node) {
      this.set('selectedNode', node);
    },

    selectItem(item) {
      this.set('selectedItem', item);
    },

    doubleClickItem(node) {
      node.set('expanded', true);
      this.set('selectedNode', node);
    }
  }
});
