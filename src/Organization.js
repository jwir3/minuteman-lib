'use strict';

import Member from './Member';
import OrganizationRegistry from './OrganizationRegistry';

export default class Organization {
  constructor(aSerializedData) {
    if (aSerializedData) {
      this._deserialize(aSerializedData);
      OrganizationRegistry.insertOrganization(this);
    }
  }

  get id() {
    return this.mId;
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

  getMemberById(id) {
    for (let idx in this.members) {
      let nextMember = this.members[idx];
      if (nextMember.id === id) {
        return nextMember;
      }
    }

    return null;
  }

  addMember(aMember) {
    if (!aMember) {
      throw ('Cannot add a null member to an organization');
    }

    for (let idx in this.members) {
      if (this.members[idx].id === aMember.id) {
        this.members[idx] = aMember;
        return;
      }
    }

    this.members.push(aMember);
  }

  _deserialize(aData) {
    this.mId = aData.id;
    this.mName = aData.name;
    this.quorum = aData.quorum;
    this.mMembers = [];

    for (let idx in aData.members) {
      let memberObj = aData.members[idx];
      let nextMember = new Member(memberObj.id, memberObj.name);
      this.addMember(nextMember);
    }
  }
}
