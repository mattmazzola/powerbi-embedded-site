import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  location: attr('string'),
  name: attr('string'),
  provisioningState: attr('string'),
  
  workspaceCollections: hasMany('workspaceCollection'),
  subscription: belongsTo('subscription')
});
