import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';

export default OAuth2Bearer.extend({
  authorize(data, block) {
    const accessToken = data['idToken'];

    if (typeof accessToken === 'string') {
      block('Authorization', `Bearer ${accessToken}`);
    }
  }
});