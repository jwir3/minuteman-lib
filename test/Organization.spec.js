import { should, expect } from 'chai';
import OfficerRole from '../src/OfficerRole';
import Organization from '../src/Organization';
import OrganizationRegistry from '../src/OrganizationRegistry';
import Member from '../src/Member';
// import { Member, Organization } from '../dist/minuteman-lib';
import moment from 'moment';
import { fixtures } from './FixtureHelper';

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

    it ('should return null if a userId that is not in the organization is queried for', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);

      org.should.exist;
      should().not.exist(org.getMemberById(817271));
    });
  });

  describe ('fixture data', () => {
    it ('should parse organization objects from fixture data', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.name.should.equal('Some Cool Organization');
      org.quorum.should.equal(0.6);
      org.id.should.equal(1);
    });

    it ('should show parsed organizations that are reserialized as equivalent', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.asJSON().should.deep.equal(fixtures['BasicOrganization'].rawObject);
    });

    it ('should show copied organizations as being deeply equal but not exactly equal', () => {
      var org1 = new Organization(fixtures['BasicOrganization'].rawObject);
      var org2 = Organization.copy(org1);

      org1.should.not.equal(org2);
      org1.asJSON().should.deep.equal(org2.asJSON());
    });
  });

  describe ('registry', () => {
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

    it ('should show one organization having been added to the registry after loading all organization fixtures', () => {
      OrganizationRegistry.clear();

      var org = new Organization(fixtures['BasicOrganization'].rawObject);

      org.should.exist;
      OrganizationRegistry.getAllOrganizations().length.should.equal(1);
    });
  });

  describe ('officer roles', () => {
    it ('should populate an empty officer role using the default constructor', () => {
      let officerRole = new OfficerRole();
      officerRole.should.exist;
      should().not.exist(officerRole.title);
      should().not.exist(officerRole.holderId);
    });

    it ('should be populated from the JSON data of an organization', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.should.exist;

      let mem0 = org.getMemberById(0);
      let officerRole0 = org.getOfficerRoleForMember(mem0);
      officerRole0.should.exist;
      officerRole0.title.should.equal('Vice Chairman');

      let mem3 = org.getMemberById(3);
      let officerRole3 = org.getOfficerRoleForMember(mem3);
      officerRole3.should.exist;
      officerRole3.title.should.equal('Chairman');
    });

    it ('should show member with id 3 as an officer', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.should.exist;

      let mem3 = org.getMemberById(3);
      mem3.should.exist;
      mem3.isOfficer().should.be.truthy;
      org.isOfficer(mem3).should.be.truthy;
      mem3.getOfficerRole().title.should.equal('Chairman');
    });

    it ('should return null for an officer role retrieval if the user passed in is null', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.should.exist;

      should().not.exist(org.getOfficerRoleForMember(null));
    });

    it ('should return null as an officer role for member with id 4 because she is not an officer', () => {
      var org = new Organization(fixtures['BasicOrganization'].rawObject);
      org.should.exist;

      var trish = org.getMemberById(4);
      trish.should.exist;

      should().not.exist(org.getOfficerRoleForMember(trish));
      org.isOfficer(trish).should.be.false;
    });
  });
});
