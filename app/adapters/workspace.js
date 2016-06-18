import SubscriptionAdapter from './subscription';

export default SubscriptionAdapter.extend({
  /**
   * Not sure why this is needed? but without it, headers are overwritten with base adapters headers
   * findLink > findHasMany > this.ajax > this.ajaxOptions > this.headers() (The onBeforeSend functions set headers result on top of options)
   */
  headers() {
    console.log('workspace#headers');
    
    return {
      'Authorization': `AppToken xyz`
    };
  },
  
  findHasMany(store, snapshot, url/*, relationship*/) {
    console.log(`workspace#findHasMany`);
    var id   = snapshot.id;
    var type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));
    
    return snapshot.record.get('token')
      .then(token => {
        return this.ajax(url, 'GET', {
          headers: {
            'Authorization': `AppToken ${token}`
          }
        });
      });
  }
});