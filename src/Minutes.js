'use strict';

import moment from 'moment';

/**
 * An object representing the minutes from a real-world meeting that either took
 * place in the past, or is taking place now.
 */
export default class Minutes {
  constructor(scheduledStartTime) {
    this.scheduledStartTime = moment(scheduledStartTime);
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
    return this.meetingScheduledTime;
  }

  set scheduledStartTime(time) {
    if (time != null) {
      this.meetingScheduledTime = time;
    } else {
      this.meetingScheduledTime = moment();
    }
  }

  get scheduledStartTimeAsString() {
    return Minutes.formatDateTime(this.meetingScheduledTime);
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

    return dateTime.format('MMMM D, YYYY hh:mma');
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
    var newObj = new Minutes(obj.scheduledStartTime);
    if (obj.calledToOrder) {
      newObj.calledToOrderTime = moment(obj.calledToOrder);
    }

    if (obj.adjourned) {
      newObj.adjournedTime = moment(obj.adjourned);
    }

    return newObj;
  }
}
