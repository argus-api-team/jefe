import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  router: service(),

  tagName: 'form',
  classNames: ['login-form', 'm-portlet'],

  applicationId: '',
  applicationSecret: '',
  username: '',
  password: '',
  isRemembered: false,
  isLogingIn: false,

  init() {
    this._super(...arguments);
    this._initCredentialProperties();
  },

  actions: {
    authenticate() {
      this.set('errorMessage', false);
      this._rememberCredentials();
      const {
        applicationId,
        applicationSecret,
        username,
        password,
      } = this.getProperties('applicationId', 'applicationSecret', 'username', 'password');
      this.set('isLogingIn', true);
      this.get('session').authenticate('authenticator:oauth2', applicationId, applicationSecret, username, password)
        .then(() => {
          this.get('router').transitionTo('index');
        })
        .catch((reason) => {
          this.set('errorMessage', reason.error);
        })
        .finally(() => {
          this.set('isLogingIn', false);
        });
    },
  },

  _initCredentialProperties() {
    const storedSession = JSON.parse(localStorage.getItem('credentialProperties'));
    if (storedSession) {
      this.set('applicationId', storedSession.applicationId);
      this.set('applicationSecret', storedSession.applicationSecret);
      this.set('username', storedSession.username);
      this.set('password', storedSession.password);
      this.set('isRemembered', storedSession.isRemembered);
    }
  },

  _saveCredentials() {
    const credentialProperties = JSON.stringify({
      applicationId: this.get('applicationId'),
      applicationSecret: this.get('applicationSecret'),
      username: this.get('username'),
      password: this.get('password'),
      isRemembered: this.get('isRemembered'),
    } || {});
    localStorage.setItem('credentialProperties', credentialProperties);
  },

  _clearCredentials() {
    localStorage.removeItem('credentialProperties');
  },

  _rememberCredentials() {
    if (this.get('isRemembered')) {
      this._saveCredentials();
    } else {
      this._clearCredentials();
    }
  },

});
