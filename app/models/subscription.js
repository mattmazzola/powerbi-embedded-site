import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  displayName: attr('string'),
  subscriptionId: attr('string'),
  state: attr('string'),
  resourceGroups: hasMany('resourceGroup', { async: true })
});
