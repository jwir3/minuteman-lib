import { should, expect } from 'chai';
import Minutes from '../src/Minutes';
import moment from 'moment';
import fixtures from './FixtureHelper';

should();

describe('Minutes', () => {
  describe('static functionality', () => {
    it('should throw an exception if we attempt to format a null scheduled start time', () => {
      expect(() => { Minutes.formatDateTime(null) }).to.throw('Unable to format a null date/time');
    });
  });

  describe('basic constructor', () => {
    it('should construct an object of type Minutes', () => {
      var minutes = new Minutes();
      minutes.should.exist;
      minutes.scheduledStartTime = null;
      minutes.scheduledStartTime.should.not.be.null;
    });
  });

  describe('constructor with a scheduled start time', () => {
    it('should construct an object of type Minutes with a scheduled start time', () => {
      var now = moment();
      var minutes = new Minutes(now);
      minutes.should.exist;

      expect(minutes.scheduledStartTime.isSame(now)).to.be.true;
      minutes.scheduledStartTimeAsString.should.equal(now.format('MMMM DD, YYYY hh:mma'));
    });
  });

  describe('parser', () => {
    it('should be able to parse a JSON object and create a new Minutes object', () => {
      var basicMinutes = fixtures['BasicMinutes'];
      basicMinutes.should.exist;

      var minutes = Minutes.parse(basicMinutes.json);
      minutes.scheduledStartTime.should.exist;
      minutes.scheduledStartTimeAsString.should.equal('July 20, 2017 07:00pm');
    });
  });

  describe('secretarial system', () => {
    it('should report that the BasicMinutes object has not been called to order', ()  => {
      var basicMinutes = fixtures['BasicMinutes'];
      basicMinutes.should.exist;

      var minutes = Minutes.parse(basicMinutes.json);
      minutes.should.exist;

      minutes.hasBeenCalledToOrder().should.be.false;
      expect(() => {minutes.calledToOrderAt()}).to.throw('Meeting has not yet been called to order');
      expect(() => {minutes.adjournedAt()}).to.throw('Meeting has not yet been adjourned');
    });

    it('should throw an exception if the CalledToOrderMinutes is called to order again', ()  => {
      var calledToOrderMinutes = fixtures['CalledToOrderMinutes'];
      calledToOrderMinutes.should.exist;

      var minutes = Minutes.parse(calledToOrderMinutes.json);
      minutes.should.exist;

      minutes.hasBeenCalledToOrder().should.be.true;
      expect(minutes.calledToOrderTime.isSame(moment('2017-04-29T19:02'))).to.be.true;
      expect(() => { minutes.callToOrder() }).to.throw('Meeting has already been called to order');
    });

    it('should throw an exception if the AdjournedMinutes is adjourned again', ()  => {
      var adjournedMinutes = fixtures['AdjournedMinutes'];
      adjournedMinutes.should.exist;

      var minutes = Minutes.parse(adjournedMinutes.json);
      minutes.should.exist;

      minutes.hasBeenCalledToOrder().should.be.true;
      minutes.hasBeenAdjourned().should.be.true;
      expect(minutes.adjournedTime.isSame(moment('2017-04-29T19:36'))).to.be.true;
      expect(() => { minutes.adjourn() }).to.throw('Meeting was already adjourned');
    });

    it ('should report that the AdjournedMinutes was called to order at 7:02pm', () => {
      var adjournedMinutes = fixtures['AdjournedMinutes'];
      adjournedMinutes.should.exist;

      var minutes = Minutes.parse(adjournedMinutes.json);
      minutes.should.exist;

      minutes.calledToOrderAt().should.have.string('7:02pm on April 29, 2017');
    });

    it ('should report that the AdjournedMinutes was adjourned at 7:36pm', () => {
      var adjournedMinutes = fixtures['AdjournedMinutes'];
      adjournedMinutes.should.exist;

      var minutes = Minutes.parse(adjournedMinutes.json);
      minutes.should.exist;

      minutes.adjournedAt().should.have.string('7:36pm');
    });

    it ('should report that the AdjournedMinutesNextDay was adjourned at 3:14am the following morning', () => {
      var adjournedMinutesNextDay = fixtures['AdjournedMinutesNextDay'];
      adjournedMinutesNextDay.should.exist;

      var minutes = Minutes.parse(adjournedMinutesNextDay.json);
      minutes.should.exist;

      minutes.adjournedAt().should.have.string('3:14am on April 30, 2017');
    });

    it ('should throw an exception if the BasicMinutes object is adjourned without being called to order', () => {
      var basicMinutes = fixtures['BasicMinutes'];
      basicMinutes.should.exist;

      var minutes = Minutes.parse(basicMinutes.json);
      minutes.should.exist;

      expect(() => { minutes.adjourn() }).to.throw('Meeting has not yet been called to order');
    });

    it('should allow the BasicMinutes object to be called to order and adjourned', ()  => {
      var basicMinutes = fixtures['BasicMinutes'];
      basicMinutes.should.exist;

      var minutes = Minutes.parse(basicMinutes.json);
      minutes.should.exist;

      minutes.hasBeenCalledToOrder().should.be.false;
      minutes.callToOrder();
      minutes.adjourn();

      minutes.hasBeenCalledToOrder().should.be.true;
      minutes.hasBeenAdjourned().should.be.true;
    });
  });
});
