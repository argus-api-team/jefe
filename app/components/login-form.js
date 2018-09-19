import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service('session'),

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
          this.get('controller').transitionToRoute('lang', { lang: this.get('controller.lang') });
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
    const session = this.get('session');
    session.get('store').restore().then((storedSession) => {
      this.set('applicationId', storedSession.applicationId);
      this.set('applicationSecret', storedSession.applicationSecret);
      this.set('username', storedSession.username);
      this.set('password', storedSession.password);
      this.set('isRemembered', storedSession.isRemembered);
    });
  },

  _saveCredentials() {
    const session = this.get('session');
    const credentialProperties = {
      applicationId: this.get('applicationId'),
      applicationSecret: this.get('applicationSecret'),
      username: this.get('username'),
      password: this.get('password'),
      isRemembered: this.get('isRemembered'),
    };
    session.get('store').persist(credentialProperties);
  },

  _clearCredentials() {
    const session = this.get('session');
    session.get('store').clear();
  },

  _rememberCredentials() {
    if (this.get('isRemembered')) {
      this._saveCredentials();
    } else {
      this._clearCredentials();
    }
  },

});
