'use strict';

export default class Organization {
  constructor(aName, aQuorum) {
    this.mName = aName;
    this.quorum = aQuorum;
    this.mMembers = [];
  }

  get name() {
    return this.mName;
  }

  set quorum(aQuorum) {
    if (!(typeof aQuorum === 'number')) {
      throw (aQuorum + ' is not a numeric value');
    }

    if (aQuorum < 0.0 || aQuorum > 1.0) {
      throw ('it is not possible to have a quorum except between 0.0 and 1.0');
    }

    this.mQuorum = aQuorum;
  }

  get quorum() {
    return this.mQuorum;
  }

  get members() {
    return this.mMembers;
  }

  addMember(aMember) {
    if (!aMember) {
      throw ('cannot add a null member to an organization');
    }

    for (var idx in this.members) {
      if (this.members[idx].equals(aMember)) {
        // Do nothing, because this member is already added.
        return;
      }
    }

    this.members.push(aMember);
  }

  static parse(jsonData) {
    var obj = JSON.parse(jsonData);

    var org = new Organization(obj.name, obj.quorum);
    return org;
  }
}
