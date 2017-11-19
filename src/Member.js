'use strict';

export default class Member {
  constructor (aSerializedData) {
    if (aSerializedData) {
      this._deserialize(aSerializedData);
    }
  }

  get id() {
    return this.mId;
  }

  get name() {
    return this.mName;
  }

  equals(aOther) {
    if (!(aOther instanceof Member)) {
      return false;
    }

    return this.name == aOther.name && this.id == aOther.id;
  }

  _deserialize(aData) {
    this.mId = aData.id;
    this.mName = aData.name;
  }
}
