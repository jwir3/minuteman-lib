import { should, expect } from 'chai';
import Organization from '../src/Organization';
import Member from '../src/Member';
import moment from 'moment';
import fixtures from './FixtureHelper';

should();

describe ('Organization', () => {
  describe ('basic object manipulation', () => {
    it ('should allow construction', () => {
      var newOrg = new Organization('Something', 0.2);
      newOrg.should.exist;

      newOrg.name.should.equal('Something');
      newOrg.quorum.should.equal(0.2);
    });

    it ('should throw an exception if an invalid quorum value is specified', () => {
      var newOrg = new Organization('Something', 0.2);
      newOrg.should.exist;

      expect(() => { newOrg.quorum = -1.0; }).to.throw('it is not possible to have a quorum except between 0.0 and 1.0');
      expect(() => { newOrg.quorum = 1.2; }).to.throw('it is not possible to have a quorum except between 0.0 and 1.0');
      expect(() => { newOrg.quorum = '1bv'}).to.throw('1bv is not a numeric value');
    });

    it ('should allow the addition of new members, provided they are defined', () => {
      var newOrg = new Organization('Something', 0.2);
      newOrg.should.exist;

      var member = null;
      expect(() => { newOrg.addMember(member); }).to.throw('cannot add a null member to an organization');

      member = new Member(206, 'Betty Samson');
      newOrg.addMember(member);
      newOrg.members.length.should.equal(1);
      newOrg.members[0].should.equal(member);

      var member2 = new Member(206, 'Betty Samson');
      newOrg.addMember(member2);
      newOrg.members.length.should.equal(1);

      var member3 = new Member(207, 'John Jimbornal');
      newOrg.addMember(member3);
      newOrg.members.length.should.equal(2);
    });
  });

  describe ('fixture data', () => {
    it ('should load the BasicOrganization fixture', () => {
      var orgFixture = fixtures['BasicOrganization'];
      orgFixture.should.exist;

      var rawObject = orgFixture.rawObject;
      rawObject.should.exist;
      rawObject.quorum.should.equal(0.60);
      rawObject.name.should.equal('Some Cool Organization');
    });

    it ('should parse organization objects from fixture data', () => {
      var orgFixture = fixtures['BasicOrganization'];
      orgFixture.should.exist;

      var org = Organization.parse(orgFixture.json);
      org.name.should.equal('Some Cool Organization');
      org.quorum.should.equal(0.6);
    });
  });
});
