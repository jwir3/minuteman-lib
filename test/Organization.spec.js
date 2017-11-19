import { should, expect } from 'chai';
import Organization from '../src/Organization';
import OrganizationRegistry from '../src/OrganizationRegistry';
import Member from '../src/Member';
// import { Member, Organization } from '../dist/minuteman-lib';
import moment from 'moment';
import {fixtures} from './FixtureHelper';

should();

describe ('Organization', () => {
  describe ('basic object manipulation', () => {
    it ('should automatically deserialize if a parameter is passed to constructor',
      () => {
        var org = new Organization(fixtures['BasicOrganization'].rawObject);

        org.should.exist;
        org.name.should.equal('Some Cool Organization');
        org.id.should.equal(1);
      }
    );

    it ('should throw an exception if an invalid quorum value is specified', () => {
      var newOrg = new Organization({
        "id": 31,
        "name": 'Something',
        "quorum": 0.2
      });
      newOrg.should.exist;

      expect(() => { newOrg.quorum = -1.0; }).to.throw('it is not possible to have a quorum except between 0.0 and 1.0');
      expect(() => { newOrg.quorum = 1.2; }).to.throw('it is not possible to have a quorum except between 0.0 and 1.0');
      expect(() => { newOrg.quorum = '1bv'}).to.throw('1bv is not a numeric value');
    });

    it ('should allow the addition of new members, provided they are defined', () => {
      var newOrg = new Organization({
        "id": 31,
        "name": 'Something',
        "quorum": 0.2
      });

      newOrg.should.exist;

      var member = null;
      expect(() => { newOrg.addMember(member); }).to.throw('Cannot add a null member to an organization');

      member = new Member({
        "id": 206,
        "name": 'Betty Samson'
      });

      newOrg.addMember(member);
      newOrg.members.length.should.equal(1);
      newOrg.members[0].should.equal(member);

      var member2 = new Member({
        "id": 206,
        "name": 'Betty Samson'
      });
      newOrg.addMember(member2);
      newOrg.members.length.should.equal(1);

      var member3 = new Member({
        "id": 207,
        "name": 'John Jimbornal'
      });
      newOrg.addMember(member3);
      newOrg.members.length.should.equal(2);
    });
  });

  describe ('fixture data', () => {
    it ('should parse organization objects from fixture data', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.name.should.equal('Some Cool Organization');
      org.quorum.should.equal(0.6);
      org.id.should.equal(1);
    });
  });

  describe ('organization registry', () => {
    it ('should not return a null organization if an unregistered id is given', () => {
      var org = OrganizationRegistry.findById(36);

      expect(!org).to.be.truthy;
    });

    it ('should allow the lookup of an organization by id', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.should.exist;
      org = null;
      org = OrganizationRegistry.findById(1);

      org.should.exist;
      org.id.should.equal(1);
      org.quorum.should.equal(0.6);
      org.name.should.equal('Some Cool Organization');
    });
  });
});
