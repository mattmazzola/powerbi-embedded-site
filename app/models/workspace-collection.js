import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  location: attr('string'),
  createdDate: attr('date'),
  provisioningState: attr('string'),
  status: attr('string'),
  skuname: attr('string'),
  skutier: attr('string'),
  
  workspaces: hasMany('workspace', { async: true })
});
