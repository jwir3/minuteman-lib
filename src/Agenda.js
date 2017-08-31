'use strict';

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

  get location() {
    return this.mLocation;
  }

  deserialize(aData) {
    this.mScheduledStartTime = aData.scheduledStartTime;
    this.mTitle = aData.title;
    this.mLocation = aData.location;
  }
}
