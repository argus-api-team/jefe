import Service from '@ember/service';
import ENV from 'jefe/config/environment';
/* global Ably */

export default Service.extend({
  init() {
    this._super(...arguments);
    this._setTokenAndChannelId();
    this._initAblyClient();
    this._subscribeChannel();
  },
  _setTokenAndChannelId() {
    const token = JSON.parse(localStorage.getItem('ember_simple_auth-session')).authenticated.access_token;
    this.set('token', token);
    const userId = JSON.parse(window.atob(token.split('.')[1])).ctx.user.id;
    const channelName = `argus-api-${userId}`;
    this.set('channelName', channelName);
  },
  _initAblyClient() {
    const ablyClient = new Ably.Realtime(ENV.ABLY_KEY);
    this.set('ablyClient', ablyClient);
  },
  _subscribeChannel() {
    const channelName = this.get('channelName');
    const ablyClient = this.get('ablyClient');
    const channel = ablyClient.channels.get(channelName);
    channel.subscribe((msg) => {
      console.log(msg);
    });
  },
});
