'use strict';

import moment from 'moment';
import Agenda from './Agenda';

/**
 * An object representing the minutes from a real-world meeting that either took
 * place in the past, or is taking place now.
 */
export default class Minutes {
  constructor(aAgenda) {
    this.agenda = aAgenda;
  }

  get meetingAgenda() {
    return this.agenda;
  }

  set meetingAgenda(aAgenda) {
    this.agenda = aAgenda;
  }

  hasAgenda() {
    return this.meetingAgenda && this.meetingAgenda !== null;
  }

  get calledToOrderTime() {
    return this.calledToOrder;
  }

  set calledToOrderTime(time) {
    this.calledToOrder = time;
  }

  get adjournedTime() {
    return this.adjourned;
  }

  set adjournedTime(time) {
    this.adjourned = time;
  }

  get scheduledStartTime() {
    if (this.hasAgenda()) {
      return this.meetingAgenda.scheduledStartTime;
    }

    return null;
  }

  get scheduledStartTimeAsString() {
    return Minutes.formatDateTime(this.scheduledStartTime);
  }

  wasCalledToOrderAndAdjournedOnTheSameDay() {
    return this.calledToOrderTime.isSame(this.adjournedTime, 'day');
  }

  calledToOrderAt() {
    if (!this.hasBeenCalledToOrder()) {
      throw ('Meeting has not yet been called to order');
    }

    return this.calledToOrderTime.format('h:mma on MMMM DD, YYYY');
  }

  adjournedAt() {
    if (!this.hasBeenAdjourned()) {
      throw ('Meeting has not yet been adjourned');
    }

    // If the date of adjournment is the same as the date of the call to order,
    // then we omit the date when reporting the adjourn time.
    if (this.wasCalledToOrderAndAdjournedOnTheSameDay()) {
      return this.adjournedTime.format('h:mma');
    }

    return this.adjournedTime.format('h:mma on MMMM DD, YYYY');
  }

  static formatDateTime(dateTime) {
    if (dateTime == null) {
      throw ("Unable to format a null date/time");
    }

    return dateTime.format('MMMM DD, YYYY hh:mma');
  }

  hasBeenCalledToOrder() {
    return this.calledToOrder != null;
  }

  hasBeenAdjourned() {
    return this.adjourned != null;
  }

  callToOrder() {
    if (this.hasBeenCalledToOrder()) {
      throw('Meeting has already been called to order');
    }

    this.calledToOrderTime = moment();
  }

  adjourn() {
    if (!this.hasBeenCalledToOrder()) {
      throw('Meeting has not yet been called to order');
    }

    if (this.hasBeenAdjourned()) {
      throw('Meeting was already adjourned at ');
    }

    this.adjournedTime = moment();
  }

  static parse(minutesJson) {
    var obj = JSON.parse(minutesJson);
    var newAgenda = null;
    if (obj.agenda !== null) {
      newAgenda = new Agenda(obj.agenda);
    }

    var newObj = new Minutes(newAgenda);
    if (obj.calledToOrder) {
      newObj.calledToOrderTime = moment(obj.calledToOrder);
    }

    if (obj.adjourned) {
      newObj.adjournedTime = moment(obj.adjourned);
    }

    return newObj;
  }
}
