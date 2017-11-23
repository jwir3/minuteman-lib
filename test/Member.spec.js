import { should, expect } from 'chai';
import Member from '../src/Member';
// import { Member } from '../dist/minuteman-lib';
import moment from 'moment';
import { fixtures } from './FixtureHelper';

should();

describe ('Members', () => {
  it ('should be constructable', () => {
    var mem = new Member({
      "id": 1,
      "name": 'Pooh Bear'
    });
    mem.should.exist;
  });

  it ('should have a name and id', () => {
    var member = new Member(fixtures['BasicMember'].rawObject);

    member.should.exist;
    member.id.should.equal(0);
    member.name.should.equal('Scott Johnson');
  });

  it ('should have an equals method that determines if two members are equivalent', () => {
    var member1 = new Member(fixtures['BasicMember'].rawObject);
    var member2 = new Member(fixtures['BasicMember'].rawObject);
    var member3 = new Member(fixtures['OfficerMember'].rawObject);

    member1.equals(member1).should.be.true;
    member1.equals(member2).should.be.true;
    member1.equals(member3).should.be.false;
    member1.equals(new Object()).should.be.false;
  });
});
