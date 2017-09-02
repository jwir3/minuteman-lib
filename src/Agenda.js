'use strict';

import moment from 'moment';

export default class Agenda {
  constructor (aSerializedData) {
    if (aSerializedData != null) {
      this.deserialize(aSerializedData);
    }
  }

  get title() {
    return this.mTitle;
  }

  get scheduledStartTime() {
    return this.mScheduledStartTime;
  }

  get scheduledStartTimeAsString() {
    return this.mScheduledStartTime.format('YYYY-MM-DD[T]HH:mm');
  }

  get location() {
    return this.mLocation;
  }

  deserialize(aData) {
    this.mScheduledStartTime = moment(aData.scheduledStartTime);
    this.mTitle = aData.title;
    this.mLocation = aData.location;
  }
}
