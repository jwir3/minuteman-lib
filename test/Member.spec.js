import { should, expect } from 'chai';
import Member from '../src/Member';
import moment from 'moment';
import fixtures from './FixtureHelper';

should();

describe ('Members', () => {
  it ('should be constructable', () => {
    var mem = new Member(1, 'Pooh Bear');
    mem.should.exist;
  });

  it ('should have a name and id', () => {
    var memberObj = fixtures['BasicMember'];
    memberObj.should.exist;

    var member = Member.parse(memberObj.json);

    member.should.exist;
    member.id.should.equal(0);
    member.name.should.equal('Scott Johnson');
  });

  it ('should have an equals method that determines if two members are equivalent', () => {
    var member1 = Member.parse(fixtures['BasicMember'].json);
    var member2 = Member.parse(fixtures['BasicMember'].json);
    var member3 = Member.parse(fixtures['OfficerMember'].json);

    member1.equals(member1).should.be.true;
    member1.equals(member2).should.be.true;
    member1.equals(member3).should.be.false;
    member1.equals(new Object()).should.be.false;
  });
});
