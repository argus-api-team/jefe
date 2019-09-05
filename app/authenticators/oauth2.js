import OAuth2PasswordGrand from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'jefe/config/environment';

export default OAuth2PasswordGrand.extend({
  serverTokenEndpoint: ENV.OAUTH_URL,
  sendClientIdAsQueryParam: true,

  authenticate(applicationId, applicationSecret, username, password) {
    const applicationAuth = btoa(`${applicationId}:${applicationSecret}`);
    const headers = { Authorization: `Basic ${applicationAuth}` };

    return this._super(username, password, '', headers);
  },

  makeRequest(url, data, headers) {
    data.type = 'pro';
    return this._super(url, data, headers);
  },
});
