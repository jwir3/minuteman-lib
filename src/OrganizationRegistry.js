'use strict';

export default class OrganizationRegistry {
  constructor() {
    this.orgs = [];
  }

  getOrganizationById(id) {
    return this.orgs[id];
  }

  storeOrganization(org) {
    this.orgs[org.id] = org;
  }

  static insertOrganization(org) {
    if (!OrganizationRegistry._instance) {
      OrganizationRegistry._instance = new OrganizationRegistry();
    }

    OrganizationRegistry._instance.storeOrganization(org);
  }

  static findById(id) {
    if (!OrganizationRegistry._instance) {
      OrganizationRegistry._instance = new OrganizationRegistry();
    }

    return OrganizationRegistry._instance.getOrganizationById(id);
  }
}
