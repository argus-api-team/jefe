import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  config: Ember.inject.service(),

  credentialProperties: [
    'applicationId','applicationSecret',
    'username', 'password', 'isRemembered'
  ],
  applicationId: Cookies.get('applicationId'),
  applicationSecret: Cookies.get('applicationSecret'),
  username: Cookies.get('username'),
  password: Cookies.get('password'),
  isRemembered: Cookies.get('isRemembered'),
  expiresLength: 15,
  isSecureCookie: Ember.computed.alias('config.APP.isSecureCookie'),

  actions: {
    authenticate() {
      this.set('errorMessage', false);

      this._rememberCredentials();

      let { applicationId, applicationSecret, username, password } = this.getProperties('applicationId', 'applicationSecret', 'username', 'password');

      this.get('session').authenticate('authenticator:oauth2', applicationId, applicationSecret, username, password).then(() => {
        this.get('controller').transitionToRoute('lang', { lang: this.get('controller.lang') });
      }, (reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  },

  _saveCredentials() {
    this.get('credentialProperties').forEach((property) => {
      Cookies.set(property, this.get(property), { expires: this.get('expiresLength'), secure: this.get('isSecureCookie') });
    });
  },

  _clearCredentials() {
    this.get('credentialProperties').forEach((property) => {
      Cookies.remove(property, { secure: this.get('isSecureCookie') });
    });
  },

  _rememberCredentials() {
    if (this.get('isRemembered')) {
      this._saveCredentials();
    } else {
      this._clearCredentials();
    }
  }
});
