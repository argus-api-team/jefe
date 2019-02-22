import Service from '@ember/service';  // eslint-disable-line
import { inject as service } from '@ember/service'; // eslint-disable-line
import ENV from 'jefe/config/environment';
import { singularize } from 'ember-inflector';
/* global Ably */

export default Service.extend({
  store: service(),
  userProfile: service(),

  init() {
    this._super(...arguments);
    this._setTokenAndChannelId();
    this._initAblyClient();
    this._subscribeChannel();
  },

  _setTokenAndChannelId() {
    const userProfile = this.get('userProfile');
    const userId = userProfile.get('userId');
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
      if (msg.name === 'get-data') {
        this._getData(msg.data.url);
      }
    });
  },

  _getData(url) {
    const splitUrl = url.split('/');
    const recordType = singularize(splitUrl[splitUrl.length - 2]);
    const recordId = splitUrl[splitUrl.length - 1];
    const store = this.get('store');
    if (recordType === 'matching') {
      store.findRecord(recordType, recordId, {
        include: 'registration-card,candidates',
        reload: true,
      }).then((matchingRecord) => {
        matchingRecord.set('isSearching', false);
      });
    }
    if (recordType === 'valorization') {
      store.findRecord(recordType, recordId, {
        include: 'values',
        reload: true,
      }).then((valorizationRecord) => {
        valorizationRecord.set('isComputing', false);
      });
    }
  },
});
