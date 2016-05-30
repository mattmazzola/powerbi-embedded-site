import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  location: attr('string'),
  createdDate: attr('date'),
  provisioningState: attr('string'),
  status: attr('string'),
  skuname: attr('string'),
  skutier: attr('string'),
  
  accessKeys: belongsTo('accessKey'),
  workspaces: hasMany('workspace'),
  resourceGroup: belongsTo('resourceGroup')
});
