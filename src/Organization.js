'use strict';

import Member from './Member';
import OfficerRole from './OfficerRole';
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

  get officerRoles() {
    return this.mOfficerRoles;
  }

  getMemberById(id) {
    for (let idx in this.members) {
      let nextMember = this.members[idx];
      if (nextMember.id == id) {
        return nextMember;
      }
    }

    return null;
  }

  getOfficerRoleForMember(aMember) {
    if (!aMember) {
      return null;
    }

    for (let idx in this.officerRoles) {
      let officerRole = this.officerRoles[idx];
      if (officerRole.holderId === aMember.id) {
        return officerRole;
      }
    }

    return null;
  }

  isOfficer(aMember) {
    for (let officerRole of this.officerRoles) {
      if (aMember.id === officerRole.holderId) {
        return true;
      }
    }

    return false;
  }

  addMember(aMember) {
    if (!aMember) {
      throw ('Cannot add a null member to an organization');
    }

    aMember.organizationId = this.id;

    for (let idx in this.members) {
      if (this.members[idx].id === aMember.id) {
        this.members[idx] = aMember;
        return;
      }
    }

    this.members.push(aMember);
  }

  asJSON() {
    return this._serialize();
  }

  _serialize() {
    let members = [];
    for (let m of this.mMembers) {
      members.push(m.asJSON());
    }

    let officerRoles = [];
    for (let role of this.mOfficerRoles) {
      officerRoles.push(role.asJSON());
    }

    return {
      "name": this.mName,
      "id": this.mId,
      "quorum": this.mQuorum,
      "officers": officerRoles,
      "members": members
    }
  }

  static copy(aOrganization) {
    return new Organization(aOrganization.asJSON());
  }

  _deserialize(aData) {
    this.mId = aData.id;
    this.mName = aData.name;
    this.quorum = aData.quorum;
    this.mMembers = [];

    for (let idx in aData.members) {
      let memberObj = aData.members[idx];
      let nextMember = new Member(memberObj);
      this.addMember(nextMember);
    }

    this._deserializeOfficerRoles(aData.officers);
  }

  _deserializeOfficerRoles(aOfficersArray) {
    this.mOfficerRoles = [];
    for (let idx in aOfficersArray) {
      let nextOfficerObj = aOfficersArray[idx];
      this.mOfficerRoles.push(new OfficerRole(this.id, nextOfficerObj));
    }
  }
}
