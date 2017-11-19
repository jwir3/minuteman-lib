'use strict';

export default class OfficerRole {
  constructor(aOrgId, aSerializedData) {
    this.organizationId = aOrgId;

    if (aSerializedData) {
      this._deserialize(aSerializedData);
    }
  }

  _deserialize(aData) {
    this.holderId = aData.holder;
    this.title = aData.title;
  }
}
