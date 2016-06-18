import SubscriptionAdapter from './subscription';

export default SubscriptionAdapter.extend({
  headers() {
    return {
      'Authorization': `AppToken xyz`
    };
  },
  
  findHasMany(store, snapshot, url /*, relationship */) {
    console.log(`report#findHasMany`);

    var id   = snapshot.id;
    var type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));

    return this.ajax(url, 'GET');
  }
});
