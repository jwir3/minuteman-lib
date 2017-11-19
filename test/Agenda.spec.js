import { should, expect } from 'chai';
import Agenda from '../src/Agenda';
import Organization from '../src/Organization';
import moment from 'moment';
import { fixtures } from './FixtureHelper';

should();

describe('Agenda Deserialization', () => {
  it ('should create an agenda with a bunch of undefined members if no parameters passed to constructor',
      () => {
        var agenda = new Agenda();

        agenda.should.exist;
        should().not.exist(agenda.title);
        should().not.exist(agenda.location);
        should().not.exist(agenda.scheduledStartTime);
      }
  );

  it ('should automatically deserialize if a parameter is passed to constructor',
    () => {
      var agenda = new Agenda(fixtures['BasicAgenda'].rawObject);

      agenda.should.exist;
      agenda.title.should.equal('Meeting of the Minds');
      agenda.location.should.equal('123 Anywhere St. Rm 302, Rosemount, MN 55068');
      agenda.scheduledStartTimeAsString.should.equal('2017-07-20T19:00');
    }
  );

  it ('should throw an exception if the organization id is not found in the registry',
    () => {
      expect(() => {var agenda = new Agenda(fixtures['AdvancedAgendaInvalidOrganization'].rawObject)})
        .to.throw("No organization found with id '31'");
    }
  );

  it ('should automatically load the organization if one is given', () => {
    var org = new Organization(fixtures['BasicOrganization'].rawObject);
    var agenda = new Agenda(fixtures['AdvancedAgenda'].rawObject);

    agenda.organization.should.exist;
    agenda.organization.id.should.equal(org.id);
    agenda.organization.name.should.equal('Some Cool Organization');
  });
});
