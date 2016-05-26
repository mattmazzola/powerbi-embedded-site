import Ember from 'ember';
import { jwt_decode } from 'ember-cli-jwt-decode';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  decoded: true,
  
  decodedAccessToken: computed('accessToken', function () {
    const decoded = jwt_decode(this.get('accessToken'));
    return JSON.stringify(decoded, null, '  ');
  }),
  
  actions: {
    setView(decoded) {
      this.set('decoded', decoded);
    }
  }
  
});
