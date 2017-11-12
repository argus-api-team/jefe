import OAuth2PasswordGrand from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrand.extend({
  serverTokenEndpoint: 'https://oauth.largus.fr/oauth/token',

  authenticate(applicationId, applicationSecret, username, password) {
    let headers = { 'Authorization':  "Basic " + btoa(applicationId + ":" + applicationSecret) };

    return this._super(username, password, '', headers);
  },

  makeRequest(url, data, headers) {
    data.type = 'pro'
    return this._super(url, data, headers);
  }
})
