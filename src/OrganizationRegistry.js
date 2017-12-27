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

  static getInstance() {
    if (!OrganizationRegistry._instance) {
      OrganizationRegistry._instance = new OrganizationRegistry();
    }

    return OrganizationRegistry._instance;
  }

  static insertOrganization(org) {

    OrganizationRegistry.getInstance().storeOrganization(org);
  }

  static findById(id) {
    return OrganizationRegistry.getInstance().getOrganizationById(id);
  }
}
