import Ember from 'ember';
import fuzzy from 'fuzzy';

const {
  computed,
  inject
} = Ember;

const BaseNode = Ember.Object.extend({
  type: 'unknown',
  value: null,
  expandable: true,
  expanded: false,
  nodes: null,
  parent: null,

  init() {
    this._super();

    this.set('detailsComponentName', `pbi-${this.get('type')}-details`);
    this.set('headersComponentName', `pbi-${this.get('type')}-headers`);
    this.set('actionsComponentName', `pbi-${this.get('type')}-actions`);
    this.set('previewComponentName', `pbi-${this.get('type')}-preview`);
  }
});

const FakeNode = BaseNode.extend({
  init() {
    this._super();

    this.set('detailsComponentName', `pbi-default-details`);
    this.set('headersComponentName', `pbi-default-headers`);
    this.set('actionsComponentName', `pbi-default-actions`);
    this.set('previewComponentName', `pbi-default-preview`);
  }
});

const ReportNode = BaseNode.extend({
  type: 'report',
  expandable: false
});

const ReportsNode = FakeNode.extend({
  type: 'reports',
  name: 'Reports',
  value: Ember.Object.create({
    name: 'Reports'
  }),
  nodes: computed('value.reports.@each', function () {
    if(Ember.isEmpty(this.get('value.reports'))) {
      return null;
    }

    return this.get('value.reports').map(report => {
      return ReportNode.create({
        parent: this,
        value: report,
        name: report.get('name')
      });
    });
  })
});

const DatasetNode = BaseNode.extend({
  type: 'dataset',
  expandable: false,

  init() {
    this._super();

    this.set('actionsComponentName', `pbi-default-actions`);
    this.set('previewComponentName', `pbi-default-preview`);
  }
});

const DatasetsNode = FakeNode.extend({
  type: 'datasets',
  name: 'Datasets',
  value: Ember.Object.create({
    name: 'Datasets'
  }),
  nodes: computed('value.datasets.@each', function () {
    if(Ember.isEmpty(this.get('value.datasets'))) {
      return null;
    }

    return this.get('value.datasets').map(dataset => {
      return DatasetNode.create({
        parent: this,
        value: dataset,
        name: dataset.get('name')
      });
    });
  })
});

const ImportNode = BaseNode.extend({
  type: 'import',
  expandable: false,

  init() {
    this._super();

    this.set('actionsComponentName', `pbi-default-actions`);
    this.set('previewComponentName', `pbi-default-preview`);
  }
});

const ImportsNode = FakeNode.extend({
  type: 'imports',
  name: 'Imports',
  value: Ember.Object.create({
    name: 'Imports'
  }),
  nodes: computed('value.imports.@each', function () {
    if(Ember.isEmpty(this.get('value.imports'))) {
      return null;
    }

    return this.get('value.imports').map(xImport => {
      return ImportNode.create({
        parent: this,
        value: xImport,
        name: xImport.get('name')
      });
    });
  })
});

const WorkspaceNode = BaseNode.extend({
  type: 'workspace',

  init() {
    this._super();

    const nodes = [
      ReportsNode.create({
        parent: this,
        value: this.get('value')
      }),
      ImportsNode.create({
        parent: this,
        value: this.get('value')
      }),
      DatasetsNode.create({
        parent: this,
        value: this.get('value')
      })
    ];

    this.set('nodes', nodes);
    this.set('headersComponentName', `pbi-default-headers`);
    this.set('detailsComponentName', `pbi-default-details`);
  }
});

const WorkspaceCollectionNode = BaseNode.extend({
  type: 'workspace-collection',

  nodes: computed('value.workspaces.@each', function () {
    if(Ember.isEmpty(this.get('value.workspaces'))) {
      return null;
    }

    return this.get('value.workspaces').map(workspace => {
      return WorkspaceNode.create({
        parent: this,
        type: 'workspace',
        value: workspace,
        name: workspace.get('id')
      });
    });
  })
});

const ResourceGroupNode = BaseNode.extend({
  type: 'resource-group',

  nodes: computed('value.workspaceCollections.@each', function () {
    if(Ember.isEmpty(this.get('value.workspaceCollections'))) {
      return null;
    }

    return this.get('value.workspaceCollections').map(workspaceCollection => {
      return WorkspaceCollectionNode.create({
        parent: this,
        type: 'workspaceCollection',
        value: workspaceCollection,
        name: workspaceCollection.get('id')
      });
    });
  })
});

const SubscriptionNode = BaseNode.extend({
  type: 'subscription',

  init() {
    this._super();

    this.set('actionsComponentName', `pbi-default-actions`);
    this.set('previewComponentName', `pbi-default-preview`);
  },

  nodes: computed('value.resourceGroups.@each', function () {
    if(Ember.isEmpty(this.get('value.resourceGroups'))) {
      return null;
    }

    return this.get('value.resourceGroups').map(resourceGroup => {
      return ResourceGroupNode.create({
        parent: this,
        value: resourceGroup,
        name: resourceGroup.get('id')
      });
    });
  })
});

const RootNode = BaseNode.extend({
  type: 'root',
  value: null,
  expandable: true,
  expanded: true
});

export default Ember.Controller.extend({
  store: inject.service('store'),
  session: inject.service('session'),
  sessionAccount: inject.service('session-account'),

  mostRecentSelectedNode: null,
  searchInput: null,
  selectedListNode: null,
  selectedTreeNode: null,
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

  treeRoot: null,

  init() {
    this._super();

    this.set('treeRoot', RootNode.create({
      nodes: this.get('subscriptionNodes')
    }));
  },

  fuzzySearchResults: computed('searchInput', 'selectedTreeNode.nodes.@each', function () {
    const nodes = this.get('selectedTreeNode.nodes');
    if(!nodes || nodes.length === 0) {
      return [];
    }

    const options = {
      pre: '<',
      post: '>',
      extract: function(el) { return el.name; }
    };
    
    const searchTerm = this.get('searchInput') || '';

    return fuzzy.filter(searchTerm, nodes, options);
  }),

  actions: {
    loadSubscriptions() {
      this.set('subscriptions', this.store.findAll('subscription'));
    },

    treeNodeClicked(node) {
      this.set('selectedTreeNode', node);
      this.set('mostRecentSelectedNode', node);
    },

    listNodeClicked(node) {
      this.set('selectedListNode', node);
      this.set('mostRecentSelectedNode', node);
    },

    listNodeDoubleClicked(node) {
      node.set('expanded', true);
      this.set('selectedTreeNode', node);
      this.set('mostRecentSelectedNode', node);
    },

    searchEscapePressed() {
      this.set('searchInput', null);
    },

    searchEnterPressed() {
      const fuzzySearchResults = this.get('fuzzySearchResults');
      if(fuzzySearchResults.length > 0) {
        const firstNode = fuzzySearchResults.get('firstObject.original');
        firstNode.set('expanded', true);
        this.set('selectedTreeNode', firstNode);
        this.set('mostRecentSelectedNode', firstNode);
        this.set('searchInput', null);
      }
    }
  }
});
