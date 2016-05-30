import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  key1: attr('string'),
  key2: attr('string'),
  
  workspaceCollection: belongsTo('workspaceCollection')
});
