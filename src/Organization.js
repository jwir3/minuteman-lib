'use strict';

import OrganizationRegistry from './OrganizationRegistry';

export default class Organization {
  constructor(aSerializedData) {
    if (aSerializedData) {
      this.deserialize(aSerializedData);
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

  deserialize(aData) {
    this.mId = aData.id;
    this.mName = aData.name;
    this.quorum = aData.quorum;
    this.mMembers = [];
  }
}
