'use strict';

import moment from 'moment';

export default class Agenda {
  constructor (aSerializedData) {
    this.scheduledStartTime = null;
    this.title = null;
    this.location = null;

    if (aSerializedData != null) {
      this.deserialize(aSerializedData);
    }
  }

  get scheduledStartTimeAsString() {
    return this.scheduledStartTime.format('YYYY-MM-DD[T]HH:mm');
  }

  deserialize(aData) {
    this.scheduledStartTime = moment(aData.scheduledStartTime);
    this.title = aData.title;
    this.location = aData.location;
  }
}
