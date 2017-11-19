'use strict';

import moment from 'moment';
import OrganizationRegistry from './OrganizationRegistry';

export default class Agenda {
  constructor (aSerializedData) {
    this.scheduledStartTime = null;
    this.title = null;
    this.location = null;

    if (aSerializedData != null) {
      this.deserialize(aSerializedData);
    }
  }

  get scheduledStartTimeAsString() {
    return this.scheduledStartTime.format('YYYY-MM-DD[T]HH:mm');
  }

  get expectedMemberNames() {
    let names = [];
    for (var memberIdx in this.members) {
      names.push(this.members[memberIdx].name);
    }

    return names;
  }

  _populateExpectedMembers(memberIds) {
    this.members = [];
    for (var idx in memberIds) {
      let nextId = memberIds[idx];
      let member = this.organization.getMemberById(nextId);
      this.members[nextId] = member;
    }
  }

  deserialize(aData) {
    this.scheduledStartTime = moment(aData.scheduledStartTime);
    this.title = aData.title;
    this.location = aData.location;
    if (aData.organizationId) {
      this.organization = OrganizationRegistry.findById(aData.organizationId);
      if (!this.organization) {
        throw "No organization found with id '" + aData.organizationId + "'";
      }

      this._populateExpectedMembers(aData.expectedMembers);
    }
  }
}
