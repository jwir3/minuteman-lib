'use strict';

export default class OfficerRole {
  constructor(aOrgId, aSerializedData) {
    this.organizationId = aOrgId;

    if (aSerializedData) {
      this._deserialize(aSerializedData);
    }
  }

  asJSON() {
    return this._serialize();
  }

  _serialize() {
    return {
      "title": this.title,
      "holder": this.holderId
    }
  }

  _deserialize(aData) {
    this.holderId = aData.holder;
    this.title = aData.title;
  }
}
