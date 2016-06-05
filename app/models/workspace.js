import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  
  workspaceCollection: belongsTo('workspaceCollection'),
  
  tokens: null,
  
  init() {
    this._super();
    this.set('tokens', []);
  }
});
