'use strict';

export default class Member {
  constructor (aId, aName) {
    this.mId = aId;
    this.mName = aName;
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

  static parse(jsonData) {
    var obj = JSON.parse(jsonData);
    var newObj = new Member(obj.id, obj.name);

    return newObj;
  }
}
