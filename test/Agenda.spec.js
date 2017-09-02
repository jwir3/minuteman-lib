import { should, expect } from 'chai';
import Agenda from '../src/Agenda';
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
});
