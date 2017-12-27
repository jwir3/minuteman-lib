'use strict';

import Organization from './Organization';

export default class OrganizationRegistry {
  constructor() {
    this.length = 0;
    this.orgs = [];
  }

  getOrganizationById(id) {
    return this.orgs[id];
  }

  storeOrganization(org) {
    this.orgs[org.id] = org;
    this.length++;
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

  static getAllOrganizations() {
    let orgRegistry = OrganizationRegistry.getInstance();
    let orgs = [];
    for (let nextOrg of orgRegistry.orgs) {
      if (nextOrg) {
        orgs.push(new Organization(nextOrg.asJSON()));
      }
    }

    return orgs;
  }

  /**
   * Remove all {Organization} objects from the registry.
   *
   * This is (obviously) a very destructive method. It really is only provided
   * as "last-ditch" effort to remove everything from the registry, for things
   * like tests.
   */
  static clear() {
    OrganizationRegistry.getInstance().orgs = [];
    OrganizationRegistry.getInstance().length = 0;
  }
}
