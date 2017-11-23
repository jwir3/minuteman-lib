'use strict';

import OrganizationRegistry from './OrganizationRegistry';

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

  get organizationId() {
    return this.mOrganizationId;
  }

  set organizationId(id) {
    this.mOrganizationId = id;
  }

  get organization() {
    if (!this.organizationId) {
      return null;
    }

    return OrganizationRegistry.findById(this.organizationId);
  }

  getOfficerRole() {
    if (!this.organization) {
      return null;
    }

    return this.organization.getOfficerRoleForMember(this);
  }

  isOfficer() {
    return this.getOfficerRole() != null;
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
